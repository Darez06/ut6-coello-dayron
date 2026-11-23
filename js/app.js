/* NEXA STUDIO — FUNCIONES INTERACTIVAS DE PARTIDA
   La práctica UT6 se centra en Git: no es necesario reprogramar estos filtros. */
(function () {
  "use strict";

  var botonTema = document.getElementById("boton-tema");
  var textoTema = document.getElementById("texto-tema");
  var botonesFiltro = Array.from(document.querySelectorAll("[data-filtro]"));
  var tarjetas = Array.from(document.querySelectorAll(".tarjeta-servicio"));
  var estadoFiltro = document.getElementById("estado-filtro");
  var anio = document.getElementById("anio");
  var CLAVE_TEMA = "nexa-studio-tema";

  function leerTemaGuardado() {
    try { return window.localStorage.getItem(CLAVE_TEMA); }
    catch (error) { return null; } // Algunos navegadores restringen file://
  }

  function guardarTema(valor) {
    try { window.localStorage.setItem(CLAVE_TEMA, valor); }
    catch (error) { /* El modo oscuro funciona igualmente en la sesión. */ }
  }

  function aplicarTema(oscuro) {
    document.body.classList.toggle("tema-oscuro", oscuro);
    botonTema.setAttribute("aria-pressed", String(oscuro));
    botonTema.setAttribute("aria-label", oscuro ? "Activar modo claro" : "Activar modo oscuro");
    textoTema.textContent = oscuro ? "Modo claro" : "Modo oscuro";
  }

  aplicarTema(leerTemaGuardado() === "oscuro");
  botonTema.addEventListener("click", function () {
    var oscuro = !document.body.classList.contains("tema-oscuro");
    aplicarTema(oscuro);
    guardarTema(oscuro ? "oscuro" : "claro");
  });

  function aplicarFiltro(categoria) {
    var visibles = 0;
    tarjetas.forEach(function (tarjeta) {
      var mostrar = categoria === "todos" || tarjeta.dataset.categoria === categoria;
      tarjeta.hidden = !mostrar;
      if (mostrar) visibles++;
    });
    botonesFiltro.forEach(function (boton) {
      var seleccionado = boton.dataset.filtro === categoria;
      boton.classList.toggle("activo", seleccionado);
      boton.setAttribute("aria-pressed", String(seleccionado));
    });
    estadoFiltro.textContent = "Mostrando " + visibles + " servicio" + (visibles === 1 ? "" : "s");
  }

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () { aplicarFiltro(boton.dataset.filtro); });
  });

  if (anio) anio.textContent = String(new Date().getFullYear());
})();
