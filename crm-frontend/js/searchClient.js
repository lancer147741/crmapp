import { findClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

export const searchClients = (clients) => {
    const findList = document.querySelector('.find-list');
    const input = document.querySelector('.header__input');
    let timeoutId;

    const rewriteTable = async (str) => {
        const response = await findClient(str);
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';

        for (const client of response) {
            tbody.append(createClientItem(client));
        }
    };

    const insertMark = (str, pos, len) => str
        .slice(0, pos) + '<mark>' + str
        .slice(pos, pos + len) + '</mark>' + str
        .slice(pos + len);

    const delaySearch = (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            rewriteTable(value);
        }, 300);
    };

    input.addEventListener('input', () => {
        const value = input.value.trim();
        const foundItems = document.querySelectorAll('.find-list__link');

        if (value !== '') {
            delaySearch(value);

            foundItems.forEach(link => {
                if (link.innerText.search(value) === -1) {
                    link.classList.add('hide');
                    link.innerHTML = link.innerText;
                } else {
                    link.classList.remove('hide');
                    findList.classList.remove('hide');
                    const str = link.innerText;
                    link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
                }
            });
        } else {
            delaySearch('');

            foundItems.forEach(link => {
                const tbody = document.querySelector('.clients__tbody');
                tbody.innerHTML = '';

                clients.forEach(client => tbody.append(createClientItem(client)));

                link.classList.remove('hide');
                findList.classList.add('hide');
                link.innerHTML = link.innerText;
            });
        }
    });
};