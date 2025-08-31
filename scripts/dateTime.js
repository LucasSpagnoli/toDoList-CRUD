export function verifyDate(diaString, mesString, horaString, minString) {
    const diaNum = parseInt(diaString);
    const mesNum = parseInt(mesString);
    const horaNum = parseInt(horaString);
    const minNum = parseInt(minString);

    if (isNaN(diaNum) || isNaN(mesNum) || isNaN(horaNum) || isNaN(minNum)) {
        return false;
    }

    const currentYear = new Date().getFullYear();
    const testDate = new Date(currentYear, mesNum - 1, diaNum);

    if (testDate.getMonth() + 1 !== mesNum || testDate.getDate() !== diaNum) {
        return false;
    }

    if (horaNum < 0 || horaNum > 23 || minNum < 0 || minNum > 59) {
        return false;
    }

    return true;
}

export function timeRemain(date, time) {
    if (date && time) {
        const [day, month] = date.split("/")
        const [hr, min] = time.split(":")
        const year = new Date().getFullYear()
        const dueDate = new Date(year, Number(month) - 1, Number(day), Number(hr), Number(min))
        const now = new Date()
        let leftDate = dueDate - now;
        if (leftDate > 0) {
            const diffDays = Math.floor(leftDate / (1000 * 60 * 60 * 24));
            leftDate %= (1000 * 60 * 60 * 24);

            const diffHours = Math.floor(leftDate / (1000 * 60 * 60));
            leftDate %= (1000 * 60 * 60);

            const diffMinutes = Math.floor(leftDate / (1000 * 60));
            leftDate %= (1000 * 60);

            let dateReturn = ""
            if (diffDays) {
                dateReturn += `${diffDays} dias`
            }
            if (diffHours) {
                dateReturn += (diffDays ? `, ${diffHours} horas` : `${diffHours} horas`)
            }
            if (diffMinutes) {
                dateReturn += (diffHours || diffDays) ? ` e ${diffMinutes} minutos.` : `${diffMinutes} minutos.`
            }
            return dateReturn;
        } else {
            return "Atrasado"
        }
    } else {
        return "(sem data de entrega)"
    }
}   