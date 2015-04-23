angular.module('arimorcApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/about-us/about-us.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=section-default><header><h1>{{ 'ABOUT_US.TITLE' | translate }}</h1></header><div><h2 class=about-subtitle>{{ 'ABOUT_US.INTRO.TITLE' | translate }}</h2><div class=about-intro><img ng-src=assets/images/image-about-us.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_2' | translate \"></p><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_3' | translate \"></p></div><button scroll-to=our-team offset=120 class=\"btn big-button down-button\"><span>{{ 'ABOUT_US.TEAM.TITLE' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><h2 class=about-subtitle id=our-team>{{ 'ABOUT_US.TEAM.TITLE' | translate }}</h2><div class=team-member-left><h3>Romaric Barthe</h3><img ng-src=assets/images/arimorc-team-rbarthe.jpg><p class=read-bio><span>Read Biography</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><p class=biography ng-bind-html=\" 'ABOUT_US.TEAM.R_BARTHE_BIO' | translate \"></p></div><div class=team-member-right><h3>Paul Schombara</h3><img ng-src=assets/images/arimorc-team-pschombara.jpg><p class=read-bio><span>Read Biography</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><p class=biography ng-bind-html=\" 'ABOUT_US.TEAM.P_SCHOMBARA_BIO' | translate \"></p></div></div></section></div>"
  );


  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Login</button> <a class=\"btn btn-default btn-lg btn-register\" href=/signup>Register</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-register\" href=/login>Login</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><p>The delete user and user index api routes are restricted to users with the 'admin' role.</p><ul class=list-group><li class=list-group-item ng-repeat=\"user in users\"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>"
  );


  $templateCache.put('app/careers/careers.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default careers\"><header><h1>{{ 'CAREERS.TITLE' | translate }}</h1></header><div class=expertise-intro><img ng-src=/assets/images/image-careers.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'CAREERS.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'CAREERS.PARAGRAPH_2' | translate \"></p><p ng-bind-html=\" 'CAREERS.PARAGRAPH_3' | translate \"></p></div><button scroll-to=offers offset=120 class=\"btn big-button down-button\"><span>{{ 'CAREERS.SEE_OFFERS_BUTTON' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><div class=\"row offers\" id=offers><div class=\"col-md-6 article-item\" ng-repeat=\"offer in offers\"><h3 ng-bind-html=offer.title></h3><p ng-bind-html=offer.intro class=article-intro></p><button class=\"btn big-button medium-button\" ng-click=open(offer)><span>{{ 'CAREERS.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section></div><script type=text/ng-template id=offer.html><h2 ng-bind-html=\"offer.title\" class=\"offer-title\"></h2>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.the_firm_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.the_firm_content\"></p>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.the_job_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.the_job_content\"></p>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.contact_us_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.contact_us_content\"></p></script>"
  );


  $templateCache.put('app/clients/clients.html',
    "<div class=col-md-12><section class=\"section-default references\"><header><h1>{{ 'CLIENTS.TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=assets/images/arimorc-clients-keneo.png><hr><div class=reference-info><a href=\"{{ 'CLIENTS.CLIENT_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-name><h3>{{ 'CLIENTS.CLIENT_1.TITLE' | translate }}</h3></div></div></div></div></div></section></div>"
  );


  $templateCache.put('app/contact-us/contact-us.html',
    "<div class=col-md-12><section class=section-default><header><h1>{{ 'CONTACT_US.TITLE' | translate }}</h1></header><div><p class=contact-form-success ng-hide=sentWithSuccess ng-bind-html=\" 'CONTACT_US.INTRO' | translate \"></p><p class=contact-form-success ng-show=sentWithSuccess ng-bind-html=\" 'CONTACT_US.SUCCESS_MESSAGE' | translate \"></p><p class=contact-form-error ng-show=sentWithError ng-bind-html=\" 'CONTACT_US.ERROR_MESSAGE' | translate \"></p><p class=contact-form-error ng-show=\"contactForm.$submitted && contactForm.$invalid && !sentWithSuccess\" ng-bind-html=\" 'CONTACT_US.EMPTY_FIELD_MESSAGE' | translate \"></p><!-- <ul>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.name.$invalid\">Name</li>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.email.$invalid\">Email</li>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.message.$invalid\">Message</li>\n" +
    "      </ul> --><form name=contactForm class=contact-form ng-class=formClass novalidate ng-hide=sentWithSuccess><div class=contact-form-left><input class=form-control name=name ng-model=contact.name placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.NAME' | translate }}\" required> <input class=form-control name=company ng-model=contact.company placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.COMPANY' | translate }}\"> <input class=form-control type=email name=email ng-model=contact.email placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.EMAIL' | translate }}\" required></div><div class=contact-form-right><textarea class=form-control name=message ng-model=contact.message placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.MESSAGE' | translate }}\" required>{{message}}</textarea><button class=\"btn big-button\" type=submit ng-click=postMail(contact)><span>{{ 'CONTACT_US.SUBMIT' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></form></div></section></div>"
  );


  $templateCache.put('app/error/error.html',
    "<div class=error><h1>404</h1><h2 ng-bind-html=\" 'ERROR.PARAGRAPH' | translate \"></h2><button href=/about-us class=\"btn big-button\" ng-click=\"goTo('main')\"><span>{{ 'ERROR.BACK_HOME_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div>"
  );


  $templateCache.put('app/expertise/expertise.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=section-default><header><h1>{{ 'EXPERTISE.TITLE' | translate }}</h1></header><div><div class=expertise-intro><img ng-src=/assets/images/image-expertise.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'EXPERTISE.PARAGRAPH' | translate \"></p></div><button scroll-to=expertise-items offset=140 class=\"btn big-button down-button\"><span>{{ 'EXPERTISE.READ_MORE_BUTTON' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><div class=expertise-items id=expertise-items><div class=item><h2><span class=expertise-number>1</span> <span>{{ 'EXPERTISE.EXPERTISE_1.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.PARAGRAPH_2' | translate \"></p><ul><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_1' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_2' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_3' | translate \"></li></ul></div></div><div class=item><h2><span class=expertise-number>2</span> <span>{{ 'EXPERTISE.EXPERTISE_2.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.PARAGRAPH_2' | translate \"></p><ul><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_1' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_2' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_3' | translate \"></li></ul></div></div><div class=item><h2><span class=expertise-number>3</span> <span>{{ 'EXPERTISE.EXPERTISE_3.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.PARAGRAPH_2' | translate \"></p><!-- <ul>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_1' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_2' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_3' | translate \"></li>\n" +
    "            </ul> --></div></div><div class=item><h2><span class=expertise-number>4</span> <span>{{ 'EXPERTISE.EXPERTISE_4.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.PARAGRAPH_2' | translate \"></p><!-- <ul>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_1' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_2' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_3' | translate \"></li>\n" +
    "            </ul> --></div></div></div></div></section></div>"
  );


  $templateCache.put('app/impressum/impressum.html',
    "<div class=\"col-md-12 impressum\"><section class=section-default><header><h1>{{ 'IMPRESSUM.TITLE_1' | translate }}</h1></header><div><h2>{{ 'IMPRESSUM.SUB_1' | translate }}</h2><!-- use &sect; ? --><p>{{ 'IMPRESSUM.PARAGRAPH_1_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_1_2' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_1_3' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_2' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_2' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_3' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_3_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_3_2' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_4' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_4_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_4_2' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_4_3' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_5' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_5_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_5_2' | translate }}</p></div></section><section class=section-default><header><h1>{{ 'IMPRESSUM.TITLE_2' | translate }}</h1></header><div><h2>{{ 'IMPRESSUM.SUB_6' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_6' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_7' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_7' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_8' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_8' | translate }}</p></div></section></div>"
  );


  $templateCache.put('app/main/main.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default home-about\"><header><h1>{{ 'HOME.INTRO.TITLE' | translate }}</h1></header><div><carousel interval=6000><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-1.jpg imageonload=displayPage()></slide><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-2.jpg></slide><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-3.jpg></slide></carousel><div class=home-main-button><button href=/about-us class=\"btn big-button\" ng-click=\"goTo('expertise')\"><span>{{ 'HOME.INTRO.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section><section class=\"section-default home-news\"><header><h1>{{ 'HOME.NEWS.TITLE' | translate }}</h1></header><div class=row><div class=\"col-md-6 article-item\" ng-repeat=\"article in articles\"><h3 ng-bind-html=article.title></h3><p ng-bind-html=article.content class=article-intro></p><button class=\"btn big-button medium-button\" ng-click=open(article)><span>{{ 'HOME.NEWS.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section></div><script type=text/ng-template id=article.html><h3 ng-bind-html=\"article.title\"></h3>\n" +
    "  <p ng-bind-html=\"article.content\"></p></script>"
  );


  $templateCache.put('app/references/references.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default references\"><header><h1>{{ 'REFERENCES.CLIENTS_TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_1.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_1.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_1.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_1.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_2.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_2.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_2.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_2.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_2.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_3.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_3.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_3.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_3.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_3.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_4.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_4.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_4.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_4.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_4.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_5.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_5.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_5.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_5.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_5.PROJECT_3' | translate }}</li></ul></div></div></div></div></div></section></div><div class=col-md-12 ng-show=!loading><section class=\"section-default references\"><header><h1>{{ 'REFERENCES.PARTNERS_TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_1.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_1.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_1.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_1.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_2.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_2.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_2.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_2.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_2.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_3.IMG' | translate }}\" imageonload=displayPage()><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_3.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_3.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_3.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_3.PROJECT_3' | translate }}</li></ul></div></div></div></div></div></section></div>"
  );


  $templateCache.put('components/footer/footer.html',
    "<div ng-controller=FooterCtrl><div class=container><div class=copyright>&copy; {{date | date:'yyyy'}} - Arimor Consulting</div><ul class=\"footer-menu list-inline\"><li ng-class=\"isActive('/contact-us')\" ng-click=\"goTo('contact-us')\"><a href=\"\">{{ 'CONTACT_US.FOOTER_TITLE' | translate }}</a></li><!-- <li ng-class=\"isActive('/careers')\" ng-click=\"goTo('careers')\">\n" +
    "        <a href=\"\">{{ 'CAREERS.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><!-- <li>\n" +
    "        <a href=\"http://intranet.arimor-consulting.de/\">{{ 'INTRANET.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><!-- <li ng-class=\"isActive('/clients')\" ng-click=\"goTo('clients')\">\n" +
    "        <a href=\"\">{{ 'CLIENTS.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><li ng-class=\"isActive('/impressum')\" ng-click=\"goTo('impressum')\"><a href=\"\">{{ 'IMPRESSUM.FOOTER_TITLE' | translate }}</a></li></ul></div></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div ng-controller=NavbarCtrl><div id=header-top><div class=container><ul class=\"top-menu list-inline\"><li class=\"{{ 'EN_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('en')\" translate=BUTTON_LANG_EN href=#></a></li><li class=\"{{ 'DE_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('de')\" translate=BUTTON_LANG_DE href=#></a></li><li class=\"{{ 'FR_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('fr')\" translate=BUTTON_LANG_FR href=#></a></li></ul><ul class=\"top-menu list-inline\"><li ng-class=\"isActive('/clients')\" ng-click=\"goTo('clients')\"><a href=\"\">{{ 'CLIENTS.FOOTER_TITLE' | translate }}</a></li><li><a href=\"http://intranet.arimor-consulting.de/\">{{ 'INTRANET.FOOTER_TITLE' | translate }}</a></li></ul></div></div><div id=header-main><div class=container><div class=logo><h1 class=sr-only>Arimor Consulting</h1><span class=helper></span> <img src=/assets/images/arimorc-logo.svg alt=\"ArimorC logo\" ng-click=\"goTo('main')\"></div><ul class=\"main-menu list-inline\"><li ng-class=\"isActive('/')\" ng-click=\"goTo('main')\"><a href=\"\">{{ 'HOME.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/our-expertise')\" ng-click=\"goTo('expertise')\"><a href=\"\">{{ 'EXPERTISE.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/references')\" ng-click=\"goTo('references')\"><a href=\"\">{{ 'REFERENCES.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/about-us')\" ng-click=\"goTo('about-us')\"><a href=\"\">{{ 'ABOUT_US.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/careers')\" ng-click=\"goTo('careers')\"><a href=\"\">{{ 'CAREERS.MENU_TITLE' | translate }}</a></li></ul></div></div></div><!-- \n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\">\n" +
    "            <a ng-href=\"{{item.link}}\">{{item.title}}</a>\n" +
    "        </li>\n" +
    "        <li ng-show=\"isAdmin()\" ng-class=\"{active: isActive('/admin')}\"><a href=\"/admin\">Admin</a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li><a ng-click=\"changeLanguage('de')\" translate=\"BUTTON_LANG_DE\" href=\"\"></a></li>\n" +
    "        <li><a ng-click=\"changeLanguage('en')\" translate=\"BUTTON_LANG_EN\" href=\"\"></a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a href=\"/signup\">Sign up</a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/login')}\"><a href=\"/login\">Login</a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p> </li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/settings')}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li>\n" +
    "      </ul>\n" +
    " -->"
  );

}]);