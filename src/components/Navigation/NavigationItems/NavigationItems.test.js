import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe("<NavigationItems/>", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); 
    })
    it('Should render 2 <NavigationItem/> if not authenticated.', () => {
        wrapper.setProps({isAuthenticated: false});
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('Should render 3 <NavigationItem/> if authenticated.', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Should render logout <NavigationItem/> if authenticated.', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout" exact>Logout</NavigationItem>)).toEqual(true);
    });
})