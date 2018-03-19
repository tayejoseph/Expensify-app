import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/loginPage";

test("Should correctly render LoginPage", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test("Should call startLogin on btn click", () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin = {startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled(); //this means we are expecting the const startLogin to have been called due to the 
    //wrapper.find('button').simulate('click'); above
});