import React from "react";
import { WithState } from "./withstate";
import { mount } from "enzyme";

describe("WithState", () => {
  it("should render with given state", () => {
    const initialState = {
      cat: 1
    };

    const el = mount(
      <WithState state={initialState}>
        {({ state }) => <div>{state.cat}</div>}
      </WithState>
    );

    expect(el.find("div").text()).toEqual("1");
  });

  it("should update state when update is called and re-render", () => {
    const initialState = {
      cat: 1
    };

    const el = mount(
      <WithState state={initialState}>
        {({ state, setState }) => (
          <div>
            <div className="text">{state.cat}</div>
            <button onClick={() => setState({ cat: 2 })} />
          </div>
        )}
      </WithState>
    );

    expect(el.find(".text").text()).toEqual("1");
    el.find("button").simulate("click");
    expect(el.find(".text").text()).toEqual("2");
  });

  it("should update state when intial state is changed and re-render", () => {
    const initialState = {
      cat: 1
    };

    const el = mount(
      <WithState state={initialState}>
        {({ state, setState }) => (
          <div>
            <div className="text">{state.cat}</div>
            <button onClick={() => setState({ cat: 2 })} />
          </div>
        )}
      </WithState>
    );

    expect(el.find(".text").text()).toEqual("1");

    el.setProps({
      state: {
        cat: 3
      }
    });

    expect(el.find(".text").text()).toEqual("3");
  });

  it("should call onChange when updating state", () => {
    const initialState = {
      cat: 1
    };
    const onChange = jest.fn();

    const el = mount(
      <WithState state={initialState} onChange={onChange}>
        {({ state, setState }) => (
          <div>
            <div className="text">{state.cat}</div>
            <button onClick={() => setState({ cat: 2 })} />
          </div>
        )}
      </WithState>
    );
    el.find("button").simulate("click");
    expect(onChange).toHaveBeenCalledWith({ cat: 2 });
  });
});
