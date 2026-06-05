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

## 📋 Workarounds / Notas

- [ ] **Deploy manual con Vercel CLI** — alternativa al `git push` cuando Vercel Hobby bloquea deploys de repos privados por restricción de colaboradores (1 solo user por proyecto). Útil si en el futuro el repo vuelve a privado:
  ```bash
  npm i -g vercel
  vercel login
  vercel --prod
  ```
  Para automatizar: GitHub Actions con un Vercel token (bypasea el check de colaboradores y mantiene el flujo `git push` → deploy).

- [ ] **Vercel Hobby + repo privado + push desde otra cuenta/org de GitHub** — Vercel bloquea el deploy diciendo "commit author did not have contributing access". Causa: el plan Hobby solo soporta 1 usuario por proyecto privado. Solución actual: repo público. Si querés mantenerlo privado, ir a la opción de Vercel CLI de arriba.
