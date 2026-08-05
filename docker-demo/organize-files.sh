#!/usr/bin/env bash

source_dir="${1:-messy}"

if [ ! -d "$source_dir" ]; then
  echo "Ошибка: папка не найдена: $source_dir"
  exit 1
fi

find "$source_dir" -maxdepth 1 -type f -print0 |
while IFS= read -r -d '' file; do
  filename="$(basename "$file")"

  if [[ "$filename" == *.* && "$filename" != .* ]]; then
    extension="${filename##*.}"
  else
    extension="no-extension"
  fi

  target_dir="$source_dir/$extension"

  mkdir -p "$target_dir"
  mv -- "$file" "$target_dir/"

  echo "Перемещён: $filename → $extension/"
done

echo "Сортировка завершена"
