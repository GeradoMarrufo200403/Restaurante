# Saboria - Plantilla de Restaurante Premium 🍽️

Bienvenido al repositorio de **Saboria**, una plantilla web moderna, escalable y de ultra alta calidad diseñada específicamente para restaurantes de categoría premium. 

Este proyecto está construido con un enfoque estricto en el rendimiento, la escalabilidad (arquitectura basada en componentes) y la internacionalización (i18n), brindando una experiencia visualmente impactante a los usuarios a través de micro-interacciones y animaciones de nueva generación.

## 🚀 Tecnologías Principales

- **[Astro](https://astro.build/)**: Framework web principal optimizado para la velocidad y el SEO, entregando sitios súper rápidos.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para un diseño estilizado, responsive y altamente estético (tipografías serif elegantes, paletas stone/dark-mode).
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático estricto para asegurar un código robusto, escalable y libre de errores en la gestión de interfaces y datos.
- **[Rive](https://rive.app/)** (`@rive-app/canvas`): Motor de animaciones vectoriales de alto rendimiento, utilizado para cabeceras y hero sections interactivas (`HeroRive.astro`).

## 🏗️ Estructura del Proyecto a Grandes Rasgos

El proyecto sigue las mejores prácticas profesionales de modularidad, separando claramente los datos, la lógica de internacionalización y la interfaz de usuario:

```text
/
├── public/
│   ├── animations/rive/  # Archivos de animación interactiva (.riv) - Arquitectura estructurada
│   └── images/           # Assets estáticos y fotografías
├── src/
│   ├── components/       # Componentes modulares y reutilizables (Ej: HeroRive.astro)
│   ├── data/             # Capa de datos (Single Source of Truth)
│   │   ├── siteDataEs.ts # Diccionario maestro en Español (textos y menú)
│   │   ├── siteDataEn.ts # Diccionario maestro en Inglés (textos y menú)
│   │   └── menuData.ts   # Patrón Puente (Bridge/Facade) para consumo dinámico
│   ├── i18n/
│   │   └── ui.ts         # Helpers globales para el control de traducciones
│   ├── layouts/          # Contenedores maestros de UI (Navbar/Drawer de Carrito/Footer)
│   └── pages/            
│       └── [lang]/       # Enrutamiento dinámico para soporte multi-idioma
│           ├── index.astro       # Landing Page (Hero dinámico)
│           ├── menu.astro        # Página del Menú (Categorías, Platillos)
│           └── sugerencias.astro # Página de Contacto / Formulario
└── package.json          # Gestión de dependencias y scripts
```

## 🌍 Internacionalización (i18n) e Integridad de Datos

Saboria está diseñado desde el día 1 para mercados internacionales. 
- Utiliza **Enrutamiento Dinámico de Astro** (ej. `/es/menu` y `/en/menu`).
- Los archivos en `src/data/siteData*.ts` actúan como diccionarios exhaustivos. Contienen todas las cadenas de texto del sitio (botones, navbar) y la totalidad de los datos estructurados del menú (80 platillos clasificados por entradas, platos fuertes, postres y bebidas).

## 🎨 Animaciones y Buenas Prácticas

Se prioriza el código "DRY" (Don't Repeat Yourself). Las implementaciones complejas, como la configuración del canvas de `Rive` (que incluye el manejo de resolución retina y cálculos de Layout `Fit.Cover`), están encapsuladas en componentes aislados (`HeroRive.astro`). Esto permite desplegar animaciones pesadas en cualquier sección inyectando una sola línea, manteniendo las páginas limpias.

## 🧞 Comandos Locales (Scripts)

Ejecuta los siguientes comandos en tu terminal para interactuar con el proyecto:

| Comando | Descripción |
| :--- | :--- |
| `npm install` | Descarga e instala las librerías necesarias (Tailwind, Rive, etc). |
| `npm run dev` | Inicia tu servidor de desarrollo local en `localhost:4321`. |
| `npm run build` | Construye tu proyecto empaquetado y listo para subir a producción (hosting). |
| `npm run preview` | Permite probar en tu PC la versión compilada exacta que verán los clientes. |
