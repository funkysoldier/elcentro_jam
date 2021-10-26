const caMemberFields = [];
const caMemberFieldsLocal = [, , , , "email", "gender", "stay", "transfer", "group", "social", "pair", "house", "comment", "kids", "cost", "ip"];
const locale = { 
    member: {
        datatime: "Дата регистрации", 
        name: "Имя", 
        surname: "Фамилия", 
        tel: "Телефон", 
        email: 'Почта', 
        gender: 'Пол', 
        stay: 'На все дни', 
        transfer: 'Трансфер', 
        group: 'Группа', 
        social: 'Социальная активность', 
        pair: 'Пара для регистрации', 
        house: 'Коттедж', 
        comment: 'Комментарий', 
        kids: "Юный участник", 
        cost: "Стоимость", 
        ip: "IP-адрес"
    }
};

function getLocale(view, key) {
    return locale[view][key];
}

function getMemberView(data){
    let html = ``;
    for (const m of data) {
        for (const key in m)
            if (Object.hasOwnProperty.call(m, key))
                html += `
                <div class="mdc-layout-grid__cell--span-4">
                  <span class="caption mdc-typography--subtitle1">${locale.member[key]}</span>
                </div>
                <div class="mdc-layout-grid__cell--span-6">
                  <span class="mdc-typography--body1">${m[key]}</span>
                </div>`;
    }
    return html;
}