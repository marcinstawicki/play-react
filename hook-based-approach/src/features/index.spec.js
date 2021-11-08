import {childCollectionReducer} from "./index";

describe('childCollectionReducer',() => {
    describe('addChildAction',() => {
        it('should add one record/object with the id 1', () => {
            let initState = [];
            const newChild = 'my new child';
            const shouldCollection = [{id: 1, identifier: newChild}];
            const action = {type:'addChildAction',payload:newChild};
            const isCollection = childCollectionReducer(initState,action);
            expect(isCollection).toStrictEqual(shouldCollection);
        });
    });
    describe('deleteChildAction',() => {
        it('should make the collection of children empty', () => {
            const id = 1;
            let initState = [{id: id, identifier: 'my new child'}];
            const shouldCollection = [];
            const action = {type:'deleteChildAction',payload:id};
            const isCollection = childCollectionReducer(initState,action);
            expect(isCollection).toStrictEqual(shouldCollection);
        });
    });
});