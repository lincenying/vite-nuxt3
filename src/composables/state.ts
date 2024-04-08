export function useCount() {
    const count = useState('count', () => 0)

    function inc() {
        count.value += 1
    }
    function dec() {
        count.value -= 1
    }

    return {
        count,
        inc,
        dec,
    }
}
