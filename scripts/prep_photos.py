"""Prepare the recovered jobsite photos for the site.

These were sitting unused on the client's server at up to 2560px and 1.5 MB. The
site needs them fast, so each is resized and written as WebP at two widths.
"""

import io
import sys
from pathlib import Path

from PIL import Image

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE = Path(__file__).resolve().parent.parent
SRC = BASE / "site-mirror" / "recovered"
DST = BASE / "assets" / "img" / "obras"

# Curated: only real Duroshield work. The Freepik stock and the flyer-overlay
# versions are deliberately excluded — they are what the redesign removes.
PHOTOS = {
    "aplicacao-planta-operacao": ("AplicacaoDuroshield1.jpg", 2000),
    "heliponto-concluido":       ("Heliponto-Depois-2-scaled-1.jpg", 2000),
    "bayer-cobertura":           ("Bayer-SJC-4.jpeg", 1600),
    "heineken-bacia-1":          ("HNK-Igrejinha-RS-71.jpg", 1600),
    "heineken-bacia-2":          ("HNK-Igrejinha-RS-52.jpg", 1600),
    "heineken-bacia-3":          ("HNK-Igrejinha-RS-79.jpg", 1600),
    "estacionamento-laje":       ("Daitan-scaled-1.jpg", 2000),
    "cobertura-fuvest":          ("Fuvest-1.jpg", 1600),
    "hidrojateamento":           ("hidrojateamento.jpg", 1920),
    "obra-detalhe":              ("IMG-20230216-WA0050.jpg", 1200),
}


def emit(img: Image.Image, stem: str, width: int, suffix: str = "") -> int:
    w, h = img.size
    if w > width:
        img = img.resize((width, round(h * width / w)), Image.LANCZOS)
    out = DST / f"{stem}{suffix}.webp"
    img.save(out, "WEBP", quality=82, method=6)
    return out.stat().st_size


def main() -> int:
    DST.mkdir(parents=True, exist_ok=True)
    total_before = total_after = 0

    for stem, (fname, width) in PHOTOS.items():
        src = SRC / fname
        if not src.exists():
            print(f"  AUSENTE  {fname}")
            continue
        before = src.stat().st_size
        img = Image.open(src).convert("RGB")
        w, h = img.size

        full = emit(img, stem, width)
        # A narrow variant so phones don't pull a 2000px file over 4G on site.
        thumb = emit(img, stem, 800, "@800")

        total_before += before
        total_after += full + thumb
        print(f"  {w}x{h:<10} {before/1024:>6.0f}KB -> {full/1024:>5.0f}KB + "
              f"{thumb/1024:>4.0f}KB  {stem}.webp")

    print(f"\n  Antes: {total_before/1024/1024:.1f} MB")
    print(f"  Depois: {total_after/1024/1024:.1f} MB "
          f"({100 - total_after/total_before*100:.0f}% menor)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
