# TODO — Mount Latin Dance

## 🚨 Alta prioridad

- [x] Poner email real en `CONTACT_EMAIL` y cambiar `onboarding@resend.dev` por dominio verificado `noreply@mount-latin-dance.com`
- [x] Agregar SEO completo: Open Graph, Twitter Card, canonical, JSON-LD (DanceStudio), descripción actualizada Tauranga
- [x] Proteger formulario con Cloudflare Turnstile + honeypot field
- [x] Rate limiting en Vercel Edge Middleware (5 reqs / 10 min por IP)
- [ ] Verificar que el formulario de contacto funcione en producción
-[ ] Generative engine optimization GEO

## 🔧 Media prioridad

- [ ] Agregar Google Analytics / umami para tracking
- [ ] Sitemap + robots.txt
- [ ] Compresión y lazy loading en imágenes de Gallery
- [ ] Modo oscuro (toggle)
- [ ] Tests con Playwright ya configurado en devDependencies
- [ ] Componente `<Helmet>` o `useEffect` para meta tags dinámicas

## ✨ Ideas / Futuro

- [ ] Calendario de clases con Google Calendar API
- [ ] Blog o sección de novedades
- [ ] Integración con Instagram feed
- [ ] Multilenguaje (ES/EN)
- [ ] PWA (service worker, manifest)
- [ ] Dashboard admin para gestionar contenido
- [ ] Newsletter (integración con Resend o similar)
- [ ] Base de datos (Supabase) para guardar reservas y alumnos
- [ ] Auth para admin/alumnos
- [ ] Tests con Playwright
