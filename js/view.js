const caMemberFields = [];
const caMemberFieldsLocal = [, , , , "email", "gender", "stay", "transfer", "group", "social", "pair", "house", "comment", "kids", "cost", "ip"];
const layout = { 
    member: {
        datetime: {
            caption: "Дата регистрации"
        }, 
        name: {
            caption: "Имя"
        },
        surname: {
            caption: "Фамилия"
        }, 
        tel: {
            caption: "Телефон",
            icon: 'smartphone'
        },
        email: {
            caption: 'Почта',
            icon: 'mail_outline'
        },
        gender: {
            caption: 'Пол', 
        },
        stay: {
            caption: 'На все дни',
            icon: 'schedule'
        },
        transfer: {
            caption: 'Трансфер',
            icon: 'airport_shuttle'
        },
        group: {
            caption: 'Группа', 
        },
        social: {
            caption: 'Социальная активность',
            icon: 'star_border'
        },
        pair: {
            caption: 'Пара для регистрации',
            icon: 'people'
        },
        house: {
            caption: 'Коттедж',
            icon: 'home'
        },
        comment: {
            caption: 'Комментарий',
            icon: 'chat_bubble_outline'
        },
        kids: {
            caption: "Юный участник",
            icon: 'supervisor_account'
        },
        cost: {
            caption: "Стоимость", 
        },
        ip: {
            caption: "IP-адрес"
        }
    }
};

function getLocale(view, key) {
    return locale[view][key];
}

function getMemberView(data){
    let html = ``;
    for (const m of data) {
        html += `
        <div class="mdc-layout-grid__cell--span-12 mdc-elevation--z1 card">
          <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__inner">
              <div class="mdc-layout-grid__cell--span-4">
                <span class="mdc-typography--headline5 title"><img class="gender" src="/img/fman.png"/> ${m["name"]} ${m["surname"]}</span>
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.tel.caption}">${layout.member.tel.icon}</i>
                  ${m["tel"]}
                </p>
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.email.caption}">${layout.member.email.icon}</i>
                  ${m["email"]}
                </p>
              </div>
              <div class="mdc-layout-grid__cell--span-8">
                <span class="mdc-typography--body2"><span class="caption">${layout.member.datetime.caption}</span>: ${m["datetime"]}</span>
                <p class="mdc-typography--body2">
                  <i class="material-icons">${layout.member.stay.icon}</i>
                  ${(m["stay"] == 'Да' ? layout.member.stay.caption : m['stay'])}
                </p>
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.transfer.caption}">${layout.member.transfer.icon}</i>
                  ${m["transfer"]}
                </p>`;
        if (m["social"].indexOf('Нет') == -1)
            html += `
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.social.caption}">${layout.member.social.icon}</i>
                  ${m["social"]}
                </p>`;
        if (m["pair"] != "")
            html += `
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.pair.caption}">${layout.member.pair.icon}</i>
                  ${m["pair"]}
                </p>`;
        if ((m["house"] != "") && (m["house"].indexOf("#") == -1))
            html += `
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.house.caption}">${layout.member.house.icon}</i>
                  ${m["house"]}
                </p>`;
        if (m["comment"] != "")
            html += `
                <p class="mdc-typography--body2">
                  <i class="material-icons" title="${layout.member.comment.caption}">${layout.member.comment.icon}</i>
                  ${m["comment"]}
                </p>`;
        if (m["kids"] != "")
            html += `
                <p class="mdc-typography--body2">
                  <i class="material-icons">${layout.member.kids.icon}</i>
                  ${m["kids"].replace('Да', layout.member.kids.caption)}
                </p>`;
        html += `
              </div>
            </div>
          </div>
          <div class="mdc-layout-grid">
            <div class="mdc-typography--headline6">${(m["cost"].indexOf("00") == -1 ? (m["cost"] == '0' ? 'Оплата не требуется' : m["cost"]) : `Стоимость: ${m["cost"]}. Оплатить до 14.11`)}</div>
          </div>
        </div>`
        // for (const key in m)
        //     if (Object.hasOwnProperty.call(m, key))
        //         html += `
        //         <div class="mdc-layout-grid__cell--span-4">
        //           <span class="caption mdc-typography--subtitle1">${locale.member[key]}</span>
        //         </div>
        //         <div class="mdc-layout-grid__cell--span-6">
        //           <span class="mdc-typography--body1">${m[key]}</span>
        //         </div>`;
    }
    return html;
}