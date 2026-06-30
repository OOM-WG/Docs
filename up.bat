@echo off

for /d %%D in ("apps\*") do (
  pushd "%%D"
  bun update --latest --recursive
  popd
)
bun update --cwd="%~dp0\blog" --latest --recursive
bun update --cwd="%~dp0\docs" --latest --recursive
bun update --cwd="%~dp0\nav" --latest --recursive

bun update --latest --recursive
