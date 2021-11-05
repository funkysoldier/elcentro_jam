const caMemberFields = [];
const caMemberFieldsLocal = ["datetime", "name", "surname", "tel", "email", "gender", "stay", "transfer", "group", "social", "pair", "house", "comment", "kids", "cost", "ip", "state"];
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
        },
        state: {
            caption: "Статус"
        }
    },
    state: {
        registred: {
            caption: 'Зарегистрирован(-а)',
            icon: 'add'
        },
        accepted: {
            caption: 'В списке',
            icon: 'done'
        },
        waiting: {
            caption: 'Лист ожидания',
            icon: 'schedule'
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
            <div class="mdc-typography--headline6">${(m["cost"].indexOf("00") == -1 ? (m["cost"] == '0' ? 
              '<span class="status--ok">Оплата не требуется</span>' : m["cost"]) : 
              `Стоимость: ${m["cost"]}. Оплатить до 14.11`)}</div>
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

function getRegistrationsView(data) {
    let html = `
  <div class="mdc-layout-grid__cell--span-12">
  <div class="mdc-data-table" id="members_table">
    <table class="mdc-data-table__table">
      <thead>
        <tr class="mdc-data-table__header-row">`;
    for (const field of ['name', 'surname', 'state']) {
        html += `
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--with-sort"
            role="columnheader" scope="col" aria-sort="none" data-column-id="${field}" style="width:150px">
            <div class="mdc-data-table__header-cell-wrapper">
              <div class="mdc-data-table__header-cell-label">${layout.member[field].caption}</div>
              <button class="mdc-icon-button material-icons mdc-data-table__sort-icon-button"
                    title="Отсортировать">arrow_upward</button>
            </div>
          </th>`;
    }
    html += `
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px">&nbsp;</th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">`;
    for (const m of data) {
        html += `
        <tr class="mdc-data-table__row">
          <td class="mdc-data-table__cell">${m['name']}</td>
          <td class="mdc-data-table__cell">${m['surname']}</td>
          <td class="mdc-data-table__cell">
            ${(m['state'] ? `<i class="material-icons" title="${layout.state[m["state"]].caption}">${layout.state[m["state"]].icon}</i>` : "")}
          </td>
          <td class="mdc-data-table__cell">
            <button class="mdc-icon-button material-icons" onclick title="">settings</button>
          </td>
        </tr>`;
    }
    html += `  
      </tbody>
    </table>
  </div></div>`;
    return html;
}