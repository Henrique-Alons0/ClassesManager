
export function formatDate(date: Date){
    return `${date.getFullYear()}_${(date.getMonth()+1).toString().padStart(2, '0')}_${(date.getDate()).toString().padStart(2, '0')}_${(date.getHours()).toString().padStart(2, '0')}_${(date.getMinutes()).toString().padStart(2, '0')}_${(date.getSeconds()).toString().padStart(2, '0')}`
}