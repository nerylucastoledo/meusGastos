export function convert(total) {
  return Number(total).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}