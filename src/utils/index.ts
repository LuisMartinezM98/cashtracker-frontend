export function formatCurrency(quantity: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(quantity)
}

export function formatDate(isoString: string){
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

    return formatter.format(date)
}