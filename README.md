# KDS – Krazy Display Service

Kitchen Display System (KDS) desarrollado con Next.js + TypeScript.
Permite visualizar y gestionar pedidos en un tablero tipo Kanban con soporte de tiempo real mediante WebSockets.

---

## 🚀 Descripción de la solución

La aplicación implementa un sistema de visualización de pedidos para cocina basado en columnas que representan estados del flujo de órdenes:

- RECEIVED
- CONFIRMED
- PREPARING
- READY
- PICKED_UP
- DELIVERED
- CANCELLED

Cada pedido puede moverse entre estados mediante drag & drop, respetando reglas de transición definidas en el dominio.

### Funcionalidades principales

- 📦 Tablero Kanban con Drag & Drop (`@dnd-kit`)
- 🔄 Sincronización en tiempo real vía WebSocket
- 🧠 Reglas de transición de estado encapsuladas en dominio
- 📄 Modal con detalle de orden
- 🎨 Soporte de tema
- 📱 Diseño responsive con scroll horizontal
- ⚡ Arquitectura modular y desacoplada

---

## 🏗️ Arquitectura

Se utilizó una arquitectura por capas inspirada en principios de separación de responsabilidades:

- domain/ → Reglas puras del negocio (OrderStatus, transiciones)
- application/ → Casos de uso y contratos (repository, realtime)
- infrastructure/ → HTTP client y socket implementation
- contexts/ → Estado global real (Orders)
- components/ → UI pura
- hooks/ → Lógica asíncrona orientada a UI
- orchestrators/ → Coordinación entre repository y realtime

### Principios aplicados

- Separación clara entre UI y lógica de aplicación
- Estado derivado calculado con `useMemo` (no duplicado en context)
- Validación de transiciones tanto en dominio como en política de UI
- Tipado estricto (`strict: true`)
- Uso de `exactOptionalPropertyTypes`
- DTOs definidos explícitamente
- Infraestructura desacoplada mediante interfaces

---

## 🔄 Flujo de actualización

1. Carga inicial vía HTTP
2. Conexión WebSocket para eventos `order.created` y `order.status.updated`
3. Sincronización automática del tablero
4. Validación de transiciones antes de actualizar estado

---

## 📦 Tecnologías

- Next.js 14
- React 18
- TypeScript
- SCSS Modules
- @dnd-kit (Drag & Drop)
- Socket.io-client
- Axios

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Instalar dependencias

```bash
pnpm install
```

### 2️⃣ Configurar variables de entorno

Crear un archivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:3004

### 3️⃣ Ejecutar en desarrollo
pnpm dev


La aplicación estará disponible en:

http://localhost:3000

🧠 Decisiones técnicas relevantes

#### 1️⃣ Separación de Riders como estado derivado

Inicialmente se evaluó un RidersContext, pero se eliminó para evitar duplicación de estado.
Los riders se derivan directamente desde ordersByStatus usando useMemo.

Esto reduce complejidad y evita renders innecesarios.

#### 2️⃣ Uso de exactOptionalPropertyTypes

Permite mayor precisión en los contratos de tipos.
Evita pasar propiedades opcionales con valor undefined explícito.

#### 3️⃣ Validación doble de transiciones

Validación de dominio (canTransition)

Política de UI (canTransitionFromUi)

Esto permite restringir visualmente acciones sin modificar reglas de negocio.

#### 4️⃣ Arquitectura desacoplada

El UI nunca accede directamente a infraestructura.
La comunicación se realiza a través de:

Orchestrator

Repository interfaces

Hooks dedicados

#### 5️⃣ Optimización

Lookup de órdenes O(1) usando Map

useMemo para estado derivado

Componentes memoizados donde aplica

Lazy loading de imágenes

🛠 Posibles mejoras futuras

Tests unitarios para reglas de transición

Tests de integración para Kanban

Persistencia local optimista

Manejo más robusto de reconexión WebSocket

Virtualización si el número de órdenes escala

Mejor manejo de errores en UI

Internacionalización

## 📌 Consideraciones finales

El objetivo principal fue construir una solución:

Clara

Escalable

Bien tipada

Con separación de responsabilidades

Fácil de extender

Se priorizó arquitectura limpia sobre complejidad innecesaria.
