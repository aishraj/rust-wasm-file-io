all:
	cargo clean
	cargo +nightly build --target=wasm32-unknown-unknown --release
	wasm-gc ./target/wasm32-unknown-unknown/release/wasm_file_io.wasm ./static/wasm/experiment.wasm
