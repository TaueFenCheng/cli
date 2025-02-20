export function uuid_gen() {
    return Math.random().toString(16).slice(1)
}
const uuid = uuid_gen()
export default uuid