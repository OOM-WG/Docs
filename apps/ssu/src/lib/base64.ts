export const base64ToBytes = (value: string) => Uint8Array.from(atob(value), char => char.charCodeAt(0))

export const base64ToArrayBuffer = (value: string) => {
	const bytes = base64ToBytes(value)
	return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}