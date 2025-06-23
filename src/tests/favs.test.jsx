import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useState } from "react";
import path from "path";
import fs from "fs";

import App from "./../App";
import MovieBox from "./../components/MovieBox";
import MovieDetails from "./../components/MovieDetails";

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./../../package.json"), "utf-8")
);
const mainCode = fs.readFileSync(
  path.resolve(__dirname, "./../main.jsx"),
  "utf-8"
);
const appCode = fs.readFileSync(
  path.resolve(__dirname, "./../App.jsx"),
  "utf-8"
);
const mdCode = fs.readFileSync(
  path.resolve(__dirname, "./../components/MovieDetails.jsx"),
  "utf-8"
);

test("react-router-dom v5 kullanılıyor mu?", () => {
  const version =
    pkg.dependencies["react-router-dom"] ||
    pkg.devDependencies?.["react-router-dom"];
  expect(version).toBeDefined();
  expect(/^(\^|~)?5\./.test(version)).toBe(true);
});

test("main.jsx'de react-router-dom wrapper componenti kullanılmış mı?", () => {
  expect(mainCode.includes("<BrowserRouter>")).toBe(true);
  expect(mainCode.includes("</BrowserRouter>")).toBe(true);
});

test("App'de movies import edilmiş mi?", () => {
  expect(appCode.includes("../movies")).toBe(true);
});

test("App'de en az iki state tanımlanmış mı?", () => {
  const pattern = /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState\s*\(/g;
  const matches = [...appCode.matchAll(pattern)];
  expect(matches.length).toBeGreaterThanOrEqual(2);
});

test("App'de film listesi state'inin başlangıç değeri doğru mu?", () => {
  expect(appCode.includes("useState(movies)")).toBe(true);
});

test("Ana sayfa '/' route'u MoviesList componentini ve filmleri render ediyor mu?", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Tombstone/i)).toBeInTheDocument();
});

// '/filmler/:id' route test
test("'/filmler/:id' route'u MovieDetails componentini render ediyor mu?", () => {
  render(
    <MemoryRouter initialEntries={["/filmler/5"]}>
      <App />
    </MemoryRouter>
  );

  // MovieDetails içinde id gösteriliyorsa test edelim
  expect(screen.getByText(/Tombstone/i)).toBeInTheDocument();
});

test("App'de handleSave fonksiyonu MovieDetails'e doğru şekilde gönderilmiş mi?", () => {
  const pattern = /<MovieDetails\s+onSave=\{handleSave\}\s*\/>/;
  expect(pattern.test(appCode)).toBe(true);
});

test("Filme tıklanınca /filmler/:id rotasına yönlendiriyor mu?", async () => {
  const user = userEvent.setup();

  // Bellek router ile başlıyoruz, başlangıç URL'si "/"
  render(
    <MemoryRouter initialEntries={["/"]}>
      {/* yönlendirme davranışı için rotaları simüle ediyoruz */}
      <Route exact path="/">
        <MovieBox
          movie={{
            id: "42",
            title: "Inception",
            year: "2010",
          }}
        />
      </Route>
      <Route path="/filmler/:id">
        <div>Film Detay Sayfası</div>
      </Route>
    </MemoryRouter>
  );

  // Kart içindeki başlığa göre öğeyi bul
  const clickableArea = screen.getByText("Inception").closest("a");

  // Alanı tıkla
  await user.click(clickableArea);

  // Detay sayfasına yönlenip yönlenmediğini kontrol et
  expect(await screen.findByText("Film Detay Sayfası")).toBeInTheDocument();
});

test("MovieDetails'da movies import edilmiş mi?", () => {
  expect(mdCode.includes("../movies")).toBe(true);
});

test("URL'deki id'ye göre doğru film detayını gösteriyor", () => {
  render(
    <MemoryRouter initialEntries={["/filmler/5"]}>
      <Route path="/filmler/:id" component={MovieDetails} />
    </MemoryRouter>
  );

  expect(screen.getByText("Tombstone")).toBeInTheDocument();
});

test("MovieDetails componentında 'Geri dön' butonuna tıklandığında bir önceki sayfaya gidiyor mu?", () => {
  const history = createMemoryHistory();

  // Simülasyon: önce bir sayfaya git, sonra MovieDetails sayfasına
  history.push("/");
  history.push("/filmler/5");

  const { getByTestId } = render(
    <Router history={history}>
      <Route path="/filmler/:id">
        <MovieDetails onSave={vi.fn()} />
      </Route>
    </Router>
  );

  const button = getByTestId("goBackBtn");
  fireEvent.click(button);

  expect(history.location.pathname).toBe("/"); // bir önceki sayfaya döndü mü?
});

test("MovieDetails componentına iletilen kaydetme fonksiyonu doğru çalışıyor mu?", () => {
  const history = createMemoryHistory();
  history.push("/filmler/5");

  function Wrapper() {
    const [savedMovies, setSavedMovies] = useState([]);

    const handleSave = (movie) => {
      const savedMovie = savedMovies.find((item) => item.id == movie.id);
      if (!savedMovie) {
        setSavedMovies((prev) => [...prev, movie]);
      }
    };

    return (
      <>
        <div data-testid="saved-count">{savedMovies.length}</div>

        <Route path="/filmler/:id">
          <MovieDetails onSave={handleSave} />
        </Route>
      </>
    );
  }

  const { getByText, getByTestId } = render(
    <Router history={history}>
      <Wrapper />
    </Router>
  );

  // Başta kayıtlı film sayısı 0
  expect(getByTestId("saved-count").textContent).toBe("0");

  const saveButton = getByText(/kaydet/i); // butonun üstündeki yazıya göre düzenle
  fireEvent.click(saveButton);

  // Tıklandıktan sonra liste 1'e çıkmalı
  expect(getByTestId("saved-count").textContent).toBe("1");
});
