#!/usr/bin/env bash
project_name="${PROJECT_NAME:-docker-demo}"

required_files=(
  "Dockerfile"
  "Makefile"
  ".gitlab-ci.yml"
  "index.html"
  "package.json"
)

missing=0

echo "Проверяю проект: $project_name"
echo "Путь к проекту: $(pwd)"
echo

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "OK: найден $file"
  else
    echo "ОШИБКА: не найден $file"
    missing=$((missing + 1))
  fi
done

echo

if [ "$missing" -eq 0 ]; then
  echo "Проверка завершена успешно"
  exit 0
else
  echo "Количество отсутствующих файлов: $missing"
  exit 1
fi
