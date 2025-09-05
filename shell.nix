let
  nixpkgs = fetchTarball
    "https://github.com/NixOS/nixpkgs/tarball/nixos-25.05";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in pkgs.mkShellNoCC {
  packages = with pkgs; [
    pnpm_10 nodejs_22 sqlite
    tailwindcss-language-server svelte-language-server
    typescript-language-server
  ];
}
