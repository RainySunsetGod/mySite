// components/ElementalModifiersPanel.tsx

import { ELEMENTS, ELEMENT_DETAILS, type Element } from "../modules/elements";

export type ElementalModifiers = Partial<Record<Element, number>>;

type Props = {
    modifiers: ElementalModifiers;
    showAll?: boolean;
};

export default function ElementalModifiersPanel({ modifiers, showAll = false }: Props) {
    const elementsToShow = showAll
        ? ELEMENTS
        : ELEMENTS.filter((el) => modifiers[el] !== undefined && modifiers[el] !== 100);

    if (elementsToShow.length === 0) {
        return (
            <div>
                <h3>Elemental Modifiers</h3>
                <p>All elements are neutral (100%).</p>
            </div>
        );
    }

    return (
        <div>
            <h3>Elemental Modifiers</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {elementsToShow.map((element) => {
                    const value = modifiers[element] ?? 100;
                    const { label, color } = ELEMENT_DETAILS[element];

                    return (
                        <li key={element} style={{ color }}>
                            {label}: <strong>{value}%</strong>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
