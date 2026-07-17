# Workforce Input Engine

## Purpose

The Workforce Input Engine is a platform layer that becomes the **single entry point** for all workforce attendance events, regardless of source:

- Manual UI
- Supervisor-assisted
- Mobile
- Biometric
- QR
- API integrations
- Excel imports
- Future IoT/hardware endpoints

Silent Core receives **normalized events only** and remains source-agnostic.

---

## Architecture Diagram

```text
Provider (Manual/Supervisor/Biometric/...)
    |
    v
Workforce Input Engine
    |
    +--> InputValidator (rules + business guards)
    |
    +--> InputNormalizer (provider payload -> canonical event)
    |
    +--> EventDispatcher (event bus foundation)
    |
    v
Silent Core (actions/reducers/storage/audit/dashboard/selectors/UI)
```

### Runtime Pipeline

```text
Provider
  -> InputEngine.processEvent(...)
      -> normalize()
      -> validate()
      -> audit log record
      -> dispatcher.dispatch(...)
          -> Silent Core
```

---

## Provider Lifecycle

1. Create provider class implementing `AttendanceProvider` contract.
2. Register provider in engine registry:

```js
const engine = new InputEngine({ dispatcher, validator, normalizer, auditLogger });
engine.registerProvider(new ManualAttendanceProvider());
engine.registerProvider(new SupervisorAttendanceProvider());
```

3. Provider receives source payload (`checkIn/checkOut/sync`).
4. Provider emits payload to engine.
5. Engine normalizes + validates + dispatches + audits.

No provider writes to storage directly.

---

## Provider Contract

Every provider must implement:

- `checkIn(payload)`
- `checkOut(payload)`
- `sync(payload)`
- `supportsRealtime()`
- `providerName()`

All providers extend:

`src/core/input/providers/AttendanceProvider.js`

---

## Canonical Event Schema

All source payloads are normalized to this exact shape:

```js
{
  id,
  workerId,
  siteId,
  projectId,
  timestamp,
  eventType,
  source,
  metadata: {}
}
```

### Supported `source`

- `MANUAL`
- `SUPERVISOR`
- `MOBILE`
- `BIOMETRIC`
- `QR`
- `API`
- `EXCEL`

### Supported `eventType`

- `CHECK_IN`
- `CHECK_OUT`
- `TRANSFER`
- `BREAK_START`
- `BREAK_END`
- `LEAVE`

---

## Validation Rules

Validation executes before dispatch to reducers:

- Worker exists
- Site exists
- Duplicate punch detection
- Invalid sequence detection
- Future timestamp rejection
- Missing IDs (event/worker/site/timestamp/eventType)
- Invalid event type

Validation result is included in audit records.

---

## Audit Record

Every processed event generates an audit entry with:

- `provider`
- `event`
- `timestamp`
- `workerId`
- `siteId`
- `validationResult`
- `validationErrors`

This applies to valid and invalid events.

---

## How to Build a New Provider

1. Create class in `src/core/input/providers/`.
2. Extend `AttendanceProvider`.
3. Implement required contract methods.
4. Add source-specific mapping in `InputNormalizer`.
5. Register provider with `engine.registerProvider(...)`.
6. Add provider tests (contract + normalization + validation + dispatch behavior).

---

## Example Biometric Provider (Future)

Expected payload:

```js
{
  employeeCode,
  deviceTime,
  deviceId,
  punchType
}
```

Normalization responsibility:

- `employeeCode -> workerId`
- `deviceTime -> timestamp`
- `punchType -> eventType`
- `deviceId -> metadata.deviceId`
- `source = BIOMETRIC`

Implementation status: scaffold only with TODO.

---

## Example Mobile Provider (Future)

Expected payload:

```js
{
  workerId,
  gps,
  photoUrl,
  deviceTimestamp,
  deviceId
}
```

Normalization responsibility:

- `deviceTimestamp -> timestamp`
- `gps/photo/deviceId -> metadata`
- `source = MOBILE`

Implementation status: scaffold only with TODO.

---

## IoT Readiness

The provider contract + registry + dispatcher design allows onboarding future endpoints (RFID, NFC, face recognition, BLE beacons, wearables, smart helmets, terminals) by adding new providers without changing Silent Core reducer logic.
