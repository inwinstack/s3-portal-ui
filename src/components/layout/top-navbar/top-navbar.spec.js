import app from '../../../index.js';
import topCtrl from './top-navbar.controller';

describe('Translate unit test', function() {
	let $translate;
	let $auth;
	let $state;
	let $toast;
	let $mdDialog;
	let AuthService;
	let makeController;
	let controller

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$translate_) => {
		$translate = _$translate_;

		makeController = () => {
			return new topCtrl($translate);
		};

		controller = makeController();
	}));
	describe('when init top-navbar controller', function() {
		it('should declare language', function() {
			expect(controller.languages['0']).to.have.property('key', 'EN');
			expect(controller.languages['0']).to.have.property('name', 'English');
			expect(controller.languages['1']).to.have.property('key', 'TW');
			expect(controller.languages['1']).to.have.property('name', '繁體中文');
			expect(controller.languages['2']).to.have.property('key', 'CN');
			expect(controller.languages['2']).to.have.property('name', '简体中文');
		});
	});

	describe('when changeLanguage', function() {
		let mockUse;
		beforeEach(function() {
			mockUse = sinon.spy(controller.$translate, 'use');
			expect(controller.currentLanguage).to.eq('EN');
			controller.changeLanguage('TW');
		});

		it('should invoke use and called by key', function() {
			expect(mockUse).to.have.be.calledWith('TW');
		});

		it('should change currentLanguage', function() {
			expect(controller.currentLanguage).to.eq('TW');
		});
	})
});