/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        fragment.appendChild(element);
    }
    document.body.appendChild(fragment);
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const buildNode = (currentLevel) => {
        const node = document.createElement('div');
        node.className = `item_${currentLevel}`;

        if (currentLevel < level) {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < childrenCount; i++) {
                fragment.appendChild(buildNode(currentLevel + 1));
            }
            node.appendChild(fragment);
        }

        return node;
    };

    return buildNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);

    // Находим узлы второго уровня внутри дерева
    const nodesToReplace = Array.from(tree.querySelectorAll('.item_2'));

    nodesToReplace.forEach((node) => {
        const section = document.createElement('section');
        // Копируем все атрибуты (включая class) через attributes
        for (const { name, value } of node.attributes) {
            section.setAttribute(name, value);
        }
        // Переносим детей
        while (node.firstChild) {
            section.appendChild(node.firstChild);
        }
        // Замена — короче и семантичнее, чем parentNode.replaceChild
        node.replaceWith(section);
    });

    return tree;
}
