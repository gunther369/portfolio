#!/usr/bin/env python3
"""Patch resume.pdf document metadata (title/author/subject) from config.js."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config.js"
PDF = ROOT / "resume.pdf"


def read_config_field(source: str, field: str) -> str | None:
    match = re.search(rf'{field}\s*:\s*"((?:\\.|[^"\\])*)"', source)
    if not match:
        return None
    return bytes(match.group(1), "utf-8").decode("unicode_escape")


def load_config() -> tuple[str, str]:
    text = CONFIG.read_text(encoding="utf-8")
    name = read_config_field(text, "name") or "Resume"
    title = read_config_field(text, "title") or ""
    return name.strip(), title.strip()


def fix_pdf(name: str, role: str) -> None:
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError as exc:
        raise SystemExit(
            "pypdf is required. Install with: pip install pypdf"
        ) from exc

    if not PDF.is_file():
        raise SystemExit(f"Missing {PDF.relative_to(ROOT)}")

    reader = PdfReader(str(PDF))
    writer = PdfWriter()
    writer.append(reader)
    writer.add_metadata(
        {
            "/Title": f"{name} Resume",
            "/Author": name,
            "/Subject": role or "Resume",
        }
    )

    tmp = PDF.with_suffix(".pdf.tmp")
    with tmp.open("wb") as handle:
        writer.write(handle)
    tmp.replace(PDF)


def main() -> int:
    name, role = load_config()
    fix_pdf(name, role)
    print(f"Updated {PDF.name}: title={name!r} Resume, author={name!r}, subject={role!r}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
