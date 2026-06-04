# <a href="https://github.com/konlyzx/delhuerto/tree/main">DelHuerto</a>

<p align="center">
  <img src="src/assets/images/delhuerto.gif" alt="DelHuerto Banner" width="100%" />
</p>

<h2 align="center">Del campo a tu mesa</h2>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2D5A27&center=true&vCenter=true&width=435&lines=Conectando+productores+locales;Alimentos+frescos+y+sostenibles;Del+campo+a+tu+mesa" alt="Typing SVG" />
</p>

---

## 🚀 Demo
Explora la plataforma en vivo aquí: [https://delhuerto-pytf.vercel.app/](https://delhuerto-pytf.vercel.app/)

## 🌿 Sobre el Proyecto
**DelHuerto** es una plataforma web diseñada para cerrar la brecha entre los **pequeños productores agrícolas** y los **consumidores conscientes**. En un mundo dominado por largas cadenas de suministro, DelHuerto devuelve el poder a lo local, permitiendo que alimentos frescos y sostenibles lleguen directamente desde la tierra a tu hogar, sin intermediarios innecesarios.

Nuestro propósito es:
- **Fortalecer el comercio local** y la economía campesina.
- **Garantizar soberanía alimentaria** mediante el acceso directo a productos de temporada.
- **Reducir la huella de carbono** al minimizar los traslados logísticos.

## 🛠️ Cómo Funciona
Transformar tu alimentación y apoyar al campo es tan simple como 1, 2, 3:

| Paso | Acción | Descripción |
| :--- | :--- | :--- |
| **01** | 🔍 **Explora** | Descubre productos frescos cultivados cerca de ti por manos locales. |
| **02** | 🛒 **Pide** | Añade lo que necesites a tu carrito y confirma tu pedido directamente. |
| **03** | 📦 **Recibe** | Coordina la entrega y paga directamente al productor al recibir tus productos. |

## 📊 Impacto Real
Estamos comprometidos con los Objetivos de Desarrollo Sostenible (ODS).

| Métrica | Logro |
| :--- | :--- |
| 👨‍🌾 **Productores Locales** | +120 |
| 🥦 **Alimentos Frescos** | +3K |
| 👨‍👩‍👧‍👦 **Familias Felices** | +500 |
| 🌍 **Reducción de Emisiones** | 30% |

## 💻 Tecnologías Utilizadas
Construido con un stack moderno para máxima velocidad y escalabilidad.

| Tecnología | Uso |
| :--- | :--- |
| **React 19** | Biblioteca principal para la interfaz de usuario. |
| **Vite** | Herramienta de construcción y servidor de desarrollo ultra rápido. |
| **Node.js** | Entorno de ejecución para el servidor y herramientas. |
| **Tailwind CSS** | Framework de estilos para un diseño artesanal y responsive. |
| **Firebase** | Backend as a Service para autenticación y base de datos. |
| **Vercel** | Hosting y despliegue continuo (CI/CD). |

## 🏗️ Arquitectura del Sistema
```mermaid
graph TD
    A[Usuario / Consumidor] -->|Navega| B[Frontend React + Vite]
    B -->|Consulta Datos| C[API Firebase / Firestore]
    C -->|Persistencia| D[(Base de Datos)]
    E[Productores] -->|Gestionan Inventario| B
    B -->|Genera| F[Pedidos Directos]
    F -->|Logística Local| G[Entregas del campo a la mesa]
```

## 📸 Preview Visual
<p align="center">
  <img src="public/assets/images/logo.png" alt="DelHuerto Logo Preview" width="400" />
</p>

## 🗺️ Roadmap
- [ ] **Autenticación Avanzada**: Perfiles detallados para cada finca.
- [ ] **Marketplace Completo**: Filtros por categorías, fincas y cercanía.
- [ ] **Pagos Digitales**: Integración con pasarelas de pago locales.
- [ ] **App Móvil**: Versión nativa para productores en el campo.
- [ ] **Panel de Administración**: Analíticas de ventas e impacto para el productor.

## ♿ Accesibilidad (WCAG 2.2)

> *"Creemos firmemente que la conexión entre el campo y la ciudad debe estar al alcance de **todas** las personas, sin importar sus capacidades tecnológicas o físicas."*

En **DelHuerto** estamos comprometidos con la inclusión digital. Nuestro desarrollo está guiado por las pautas de accesibilidad **WCAG 2.2**, garantizando una experiencia de usuario cómoda, intuitiva y equitativa.

### 🌟 Estándares Implementados

A continuación, destacamos los principios clave que ya forman parte de nuestra arquitectura:

| Principio | Criterio (WCAG) | Cómo lo logramos | Impacto en el Usuario |
| :--- | :--- | :--- | :--- |
| **👁️ Perceptible** | **Alternativas de Texto (1.1.1)** | Todas las imágenes críticas cuentan con el atributo `alt` descriptivo. | Quienes usan lectores de pantalla pueden "ver" y entender nuestro contenido visual. |
| **👁️ Perceptible** | **Estructura Semántica (1.3.1)** | Construido con HTML5 estricto (`<main>`, `<nav>`, `<h1>`-`<h4>`). | Facilita la navegación rápida y estructurada por el flujo de la página. |
| **👁️ Perceptible** | **Adaptabilidad Continua (1.4.10)** | Interfaz 100% *responsive* / *reflow* impulsada por Tailwind CSS. | Experiencia perfecta desde cualquier dispositivo sin importar el zoom. |
| **🧠 Comprensible** | **Idioma del Documento (3.1.1)** | Definición nativa del idioma base de la plataforma en la etiqueta `<html lang>`. | Las herramientas de asistencia pronuncian el texto con el acento y reglas correctas. |
| **🧠 Comprensible** | **Etiquetas Claras (3.3.2)** | Integración nativa de la etiqueta `<label>` en formularios e inputs. | Minimiza errores cognitivos al registrarse o completar un pedido. |

### 🚀 Próximos Pasos (Roadmap A11y)
Nuestro camino hacia la accesibilidad total no se detiene aquí. Nuestras próximas iteraciones apuntan al nivel **AA**, incluyendo:
- ⌨️ Navegación completa por teclado (*Skip-links* y *Focus indicators*).
- 🔊 Reducción de movimiento (*prefers-reduced-motion*) para usuarios sensibles.
- 🏷️ Enriquecimiento de componentes dinámicos con **Aria Roles**.

## 📧 Contacto
- **Email**: [hola@delhuerto.com](mailto:hola@delhuerto.com)
- **Ubicación**: Cali, Colombia 🇨🇴

---
<p align="center">Hecho por <a href="https://github.com/konlyzx/delhuerto">DelHuerto</a></p>
