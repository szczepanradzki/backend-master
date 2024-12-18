import React, {memo, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {useDrop} from "react-dnd";
import ItemTypes from "../../utils/ItemTypes";
import {ListWrapper} from "./components";

function SelectMany({
                      addRelation,
                      name,
                      onRemove,
                      options,
                      mainField,
                      id,
                      value
                    }) {
  const [, drop] = useDrop({accept: ItemTypes.RELATION});
  const findRelation = id => {

    const relation = value.filter(c => {
      return `${c.id}` === `${id}`;
    })[0];

    return {
      relation,
      index: value.indexOf(relation)
    };
  };

  const setRelation = (e, index, id) => {
    if(e.target.checked) {
      const arr = [];
      arr.push({value: id});
      addRelation(arr);
    } else {
      onRemove(`${name}.${index}`);
    }
  };
  return (
    <ListWrapper ref={drop}>
      {options.map((option) => {
        return (
          <label key={option.value.id} htmlFor={option.value.name}>
            <input type="checkbox"
                   name={name}
                   id={option.value.name}
                   checked={findRelation(option.value.id).relation}
                   onChange={(e) => setRelation(e, findRelation(option.value.id).index, option.value.id)}
            />
            {option.label}
          </label>
        );
      })}
    </ListWrapper>
  );
}

export default memo(SelectMany);
