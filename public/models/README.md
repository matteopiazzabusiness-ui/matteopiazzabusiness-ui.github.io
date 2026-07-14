# Modello 3D del mezzo — viaggio Homepage

Metti qui il modello reale con nome esatto:

```
public/models/dlf-mezzo.glb
```

Appena il file è presente, il viaggio 3D in Homepage lo carica automaticamente
(altrimenti usa il mezzo procedurale di fallback). Nessuna modifica al codice.

## Requisiti del file
- Formato **`.glb`** (glTF binario), **non compresso Draco/Meshopt**
  (altrimenti serve abilitare il decoder — chiedi allo sviluppatore).
- Orientamento: mezzo rivolto lungo l'asse **+Z**, in piedi su **+Y**.
- Il modello viene **centrato e scalato automaticamente** (altezza ~4.5 unità).
- Per la **vista esplosa**: esporta con i componenti come **mesh separate**
  (cingoli, corpo, cabina, braccio, benna…). Ogni mesh si allontana dal centro.
  Se è un'unica mesh, l'esplosione non separa i pezzi (rotazione/hologram restano).

## Dove trovarlo
- File CAD/3D ufficiale del costruttore (Caterpillar/Dieci) convertito in glTF.
- Un modello acquistato/commissionato (es. da un 3D artist) esportato in `.glb`.
- Peso consigliato < 8–10 MB per prestazioni web (ottimizza/riduci i poligoni).
