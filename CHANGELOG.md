# [1.28.0](https://github.com/webex/components/compare/v1.27.0...v1.28.0) (2020-01-13)


### Features

* **RemoteMedia:** add README ([3b48af1](https://github.com/webex/components/commit/3b48af16665e01d9f04074a765b87161688c3482))

# [1.27.0](https://github.com/webex/components/compare/v1.26.1...v1.27.0) (2019-12-19)


### Features

* **MeetingJsonAdapter:** implement getStream ([1796006](https://github.com/webex/components/commit/17960063ebba78b0f261a67a58d5791cef2b44fc))
* **RemoteMedia:** implement one ([d867b34](https://github.com/webex/components/commit/d867b34e26f9b7fa607a213b4bd5a80e04430213))
* **UseStream:** implement one ([c2eb1ff](https://github.com/webex/components/commit/c2eb1ff1b6d137b73f7a50070da6385701c8624f))
* **LocalMedia:** invoke useStream() ([21a99de](https://github.com/webex/components/commit/21a99defe163cfed53d59b41110f31835da332ff))
* **MeetingsData:** remove start and end time properties ([bf6ca85](https://github.com/webex/components/commit/bf6ca858a87c2e062d3e50278656a7330c088e92))
* **UseVideo:** remove the hook ([b608790](https://github.com/webex/components/commit/b6087904ef540fad5c2fd085b31cb52097b16374))
* **hooks:** replace useStream with useVideo ([c63de3b](https://github.com/webex/components/commit/c63de3b0c093143c9138c6c39bf18d02ebe1e31c))

## [1.26.1](https://github.com/webex/components/compare/v1.26.0...v1.26.1) (2019-12-17)


### Bug Fixes

* **WebexDataProvider:** replace exact proptype with shape ([7166846](https://github.com/webex/components/commit/7166846b04ef59a997bc610ce4fa7110b122ff0f))

# [1.26.0](https://github.com/webex/components/compare/v1.25.0...v1.26.0) (2019-12-16)


### Bug Fixes

* **hooks:** usePerson updates whenver a new person ID is passed in ([32c3b35](https://github.com/webex/components/commit/32c3b3544825da60f39270bebd1d7696347596ae))


### Features

* **hooks:** add useMe hook ([89b8b6d](https://github.com/webex/components/commit/89b8b6d02f3876c2da208faab4ea6d3dc6b24628))
* **PeopleJsonAdpater:** implement getMe() ([a708c1b](https://github.com/webex/components/commit/a708c1b7f6e3455f050714b2becd8b12edf0125c))
* **LocalMedia:** use getMe hook instead of personID prop ([1e0c1f6](https://github.com/webex/components/commit/1e0c1f6994fe172354dfc0fff38e84a57c76db53))

# [1.25.0](https://github.com/webex/components/compare/v1.24.0...v1.25.0) (2019-12-04)


### Features

* **WebexMeetingControl:** implement component ([b4fcf5a](https://github.com/webex/components/commit/b4fcf5abc645df1208fe400771136b088ab20954))
* **WebexMeetingControls:** implement HOC ([5c89588](https://github.com/webex/components/commit/5c895880681996aaab2cd90cfc46457062f62190))

# [1.24.0](https://github.com/webex/components/compare/v1.23.0...v1.24.0) (2019-11-27)


### Features

* **MeetingsJSONAdapter:** add mute-audio meeting control ([f6b7b98](https://github.com/webex/components/commit/f6b7b98eb3abde369ddbdf317f87202f4262cc5e))

# [1.23.0](https://github.com/webex/components/compare/v1.22.0...v1.23.0) (2019-11-22)


### Features

* **WebexLocalMedia:** implement a component ([73309fe](https://github.com/webex/components/commit/73309fe8b90236029b3320207169f2463bae6c7a))
* **UseVideo:** implement a new hook ([65cb656](https://github.com/webex/components/commit/65cb65657b359c65f623fd292d411fa4cbc5f1e3))
* **MeetingsJsonAdapter:** implement getLocalMedia method ([6f53f67](https://github.com/webex/components/commit/6f53f67c24990fd4806eebb91de5309867dba2ac))
* **MeetingsData:** replace empty objects with null ([e205748](https://github.com/webex/components/commit/e2057482f0e6e742a9d7e5881a8b7619eb625470))

# [1.22.0](https://github.com/webex/components/compare/v1.21.0...v1.22.0) (2019-11-07)


### Features

* **WebexMeetingInfo:** add component ([b66411c](https://github.com/webex/components/commit/b66411c727610f70a6e6eb3dff4abbea3a77c70a))

# [1.21.0](https://github.com/webex/components/compare/v1.20.0...v1.21.0) (2019-11-04)


### Features

* **WebexDataProvider:** add meetings adapter ([0568cb5](https://github.com/webex/components/commit/0568cb52d37a4cf9f407edaee046494e413274a2))
* **data:** add meetings data ([2fb36ac](https://github.com/webex/components/commit/2fb36acb0cf66cf814f262209c888ecd0f969bcf))
* **adapters:** add MeetingsJSONAdapter to export ([c13694f](https://github.com/webex/components/commit/c13694fdab7bc13e3e6d799ea514257bfaea3ab4))
* **hooks:** add useMeeting hook ([904bc27](https://github.com/webex/components/commit/904bc27c83ea821677d7bff2d72f33b76b17c596))

# [1.20.0](https://github.com/webex/components/compare/v1.19.2...v1.20.0) (2019-11-01)


### Features

* **MeetingsJsonAdapter:** implement getMeeting ([ea11f34](https://github.com/webex/components/commit/ea11f344e1f351c6d8fd2a97f8d2962c20dc748a))

## [1.19.2](https://github.com/webex/components/compare/v1.19.1...v1.19.2) (2019-10-31)


### Bug Fixes

* **package:** install mockdate ([edf655c](https://github.com/webex/components/commit/edf655c4019b37e2fafde281c2df730b932a45ff))
* **mocks:** remove date-fns Jest mock ([9b81c8a](https://github.com/webex/components/commit/9b81c8a07a089b6f4d32f3abf8c69c11f50047c2))
* **package:** update date-fns to 2.6.0 ([3dc8ad3](https://github.com/webex/components/commit/3dc8ad3a1f764cbc5a25830d68c2314cc3eb4900))

## [1.19.1](https://github.com/webex/components/compare/v1.19.0...v1.19.1) (2019-10-30)


### Bug Fixes

* **package:** install meetings adapter interface ([d018094](https://github.com/webex/components/commit/d0180942304528d531dc3460c84a88df0606eadc))

# [1.19.0](https://github.com/webex/components/compare/v1.18.1...v1.19.0) (2019-10-29)


### Bug Fixes

* **package:** install component adapter interfaces ([5a29ec7](https://github.com/webex/components/commit/5a29ec7be8c3e95cfa8b1244267742c60dc3d8d8))


### Features

* **adapters:** remove adapter interfaces ([77ed50e](https://github.com/webex/components/commit/77ed50ef239b0fe7887246140ff5e233290380de))
* **adapters:** update interface imports ([472cf5a](https://github.com/webex/components/commit/472cf5a36558bff857b2044f744edb945e333efd))

## [1.18.1](https://github.com/webex/components/compare/v1.18.0...v1.18.1) (2019-10-08)


### Bug Fixes

* **ActivityStream:** fix display order of previous activities ([fbc4dec](https://github.com/webex/components/commit/fbc4dec))

# [1.18.0](https://github.com/webex/components/compare/v1.17.0...v1.18.0) (2019-10-07)


### Features

* **RoomsAdapter:** add hasMoreActivities to interface ([33ffc99](https://github.com/webex/components/commit/33ffc99))
* **RoomsJSONAdapter:** implement get previous activities chunking ([9b2fd45](https://github.com/webex/components/commit/9b2fd45))
* **ActivityStream:** load more activities on scroll up ([f4af0c8](https://github.com/webex/components/commit/f4af0c8))
* **ActivityStream:** load previous activities until container is filled ([3a22bdf](https://github.com/webex/components/commit/3a22bdf))

# [1.17.0](https://github.com/webex/components/compare/v1.16.0...v1.17.0) (2019-09-23)


### Features

* **WebexAvatar:** display gray empty avatar onError ([17b89bc](https://github.com/webex/components/commit/17b89bc))

# [1.16.0](https://github.com/webex/components/compare/v1.15.0...v1.16.0) (2019-09-21)


### Bug Fixes

* **components:** update index file to export all components ([a368ecc](https://github.com/webex/components/commit/a368ecc))


### Features

* **WebexDataProvider:** implement the component ([c5d96c3](https://github.com/webex/components/commit/c5d96c3))

# [1.15.0](https://github.com/webex/components/compare/v1.14.0...v1.15.0) (2019-09-20)


### Bug Fixes

* **mocks:** useActivityStream proper mock ([ffffd92](https://github.com/webex/components/commit/ffffd92))


### Features

* **data:** add time ruler data ([202bf41](https://github.com/webex/components/commit/202bf41))
* **RoomsJsonAdapter:** add time ruler support ([e4b899c](https://github.com/webex/components/commit/e4b899c))
* **ActivityStream:** add TimeRuler component ([0bfbe08](https://github.com/webex/components/commit/0bfbe08))

# [1.14.0](https://github.com/webex/components/compare/v1.13.0...v1.14.0) (2019-09-12)


### Features

* **ActivityStream:** implement component  default state ([92e720b](https://github.com/webex/components/commit/92e720b))

# [1.13.0](https://github.com/webex/components/compare/v1.12.1...v1.13.0) (2019-09-11)


### Bug Fixes

* **rooms:** change title to more appropiate name ([921fad3](https://github.com/webex/components/commit/921fad3))
* **UnitTest:** copy an object immutably ([0672dfd](https://github.com/webex/components/commit/0672dfd))
* **RoomsJsonAdapter:** invoke the appropiate method ([4246685](https://github.com/webex/components/commit/4246685))
* **rooms:** seperate acitivities id from room id ([08b3ab6](https://github.com/webex/components/commit/08b3ab6))


### Features

* **ActivityStream:** implement empty state ([90c7c24](https://github.com/webex/components/commit/90c7c24))

## [1.12.1](https://github.com/webex/components/compare/v1.12.0...v1.12.1) (2019-09-11)


### Bug Fixes

* **style:** bundle momentum-ui styling modules ([9701887](https://github.com/webex/components/commit/9701887))
* **activity:** export component from index file ([8ef4ddf](https://github.com/webex/components/commit/8ef4ddf))
* **activity:** stringify date parameter ([4e3e8e0](https://github.com/webex/components/commit/4e3e8e0))

# [1.12.0](https://github.com/webex/components/compare/v1.11.0...v1.12.0) (2019-09-10)


### Features

* **rooms:** implemented rooms JSON adapter interface ([7d30e10](https://github.com/webex/components/commit/7d30e10))

# [1.11.0](https://github.com/webex/components/compare/v1.10.2...v1.11.0) (2019-09-05)


### Features

* **rooms:** create adapter interface ([408e6bc](https://github.com/webex/components/commit/408e6bc))

## [1.10.2](https://github.com/webex/components/compare/v1.10.1...v1.10.2) (2019-09-04)


### Performance Improvements

* **circleci:** use workspace to presist the data between the jobs ([c4aa0b8](https://github.com/webex/components/commit/c4aa0b8))

## [1.10.1](https://github.com/webex/components/compare/v1.10.0...v1.10.1) (2019-08-30)


### Bug Fixes

* **circleci:** validate build before releasing ([e48c648](https://github.com/webex/components/commit/e48c648))

# [1.10.0](https://github.com/webex/components/compare/v1.9.1...v1.10.0) (2019-08-29)


### Bug Fixes

* **storybook:** prettify ([ca23def](https://github.com/webex/components/commit/ca23def))


### Features

* **data:** add index module ([a3fbe9a](https://github.com/webex/components/commit/a3fbe9a))
* **storybook:** configure sass-resource-loader ([3583a2e](https://github.com/webex/components/commit/3583a2e))
* **WebexActivity:** implement component ([9741751](https://github.com/webex/components/commit/9741751))

## [1.9.1](https://github.com/webex/components/compare/v1.9.0...v1.9.1) (2019-08-29)


### Bug Fixes

* **hooks:** add dependencies to effect hook ([bd93a90](https://github.com/webex/components/commit/bd93a90))

# [1.9.0](https://github.com/webex/components/compare/v1.8.0...v1.9.0) (2019-08-28)


### Features

* **hooks:** add usePerson react hook ([aafd563](https://github.com/webex/components/commit/aafd563))

# [1.8.0](https://github.com/webex/components/compare/v1.7.0...v1.8.0) (2019-08-22)


### Bug Fixes

* **ActivityAdapter:** replace activity with activities ([4006b47](https://github.com/webex/components/commit/4006b47))
* **avatar:** replace person with people ([c850dbf](https://github.com/webex/components/commit/c850dbf))
* **PeopleJson:** reword some terms to map accordingly ([38991ce](https://github.com/webex/components/commit/38991ce))


### Features

* **ActivityJson:** implement the adapter ([f5f892b](https://github.com/webex/components/commit/f5f892b))

# [1.7.0](https://github.com/webex/components/compare/v1.6.0...v1.7.0) (2019-08-20)


### Bug Fixes

* **people:** rename person filename to people ([82d9731](https://github.com/webex/components/commit/82d9731))


### Features

* **people:** create person status enum ([27843f8](https://github.com/webex/components/commit/27843f8))
* **avatar:** implement the component ([5e35eec](https://github.com/webex/components/commit/5e35eec))
* **person:** re-format the object and some prop values ([728bc4b](https://github.com/webex/components/commit/728bc4b))

# [1.6.0](https://github.com/webex/components/compare/v1.5.0...v1.6.0) (2019-08-19)


### Features

* **activity:** add ActivityAdapter interface ([b446e0d](https://github.com/webex/components/commit/b446e0d))

# [1.5.0](https://github.com/webex/components/compare/v1.4.0...v1.5.0) (2019-08-16)


### Features

* **webexadapter:** add datasource instance property ([d244e13](https://github.com/webex/components/commit/d244e13))
* **peopleadapter:** extend WebexAdapter ([3be7202](https://github.com/webex/components/commit/3be7202))
* **peopleadapter:** init with json data ([d498811](https://github.com/webex/components/commit/d498811))
* **persondata:** update shape ([8be1928](https://github.com/webex/components/commit/8be1928))

# [1.4.0](https://github.com/webex/components/compare/v1.3.0...v1.4.0) (2019-08-09)


### Bug Fixes

* **.gitignore:** watch only json files in src/data/ directory ([8b0b4b9](https://github.com/webex/components/commit/8b0b4b9))


### Features

* **peoplejsonadapter:** create adapter and unit test ([090376b](https://github.com/webex/components/commit/090376b))

# [1.3.0](https://github.com/webex/components/compare/v1.2.1...v1.3.0) (2019-08-08)


### Features

* **peopleadapter:** create an interface ([3756f53](https://github.com/webex/components/commit/3756f53))

## [1.2.1](https://github.com/webex/components/compare/v1.2.0...v1.2.1) (2019-08-08)


### Bug Fixes

* **release:** use default commit message to push to master ([4f20a1c](https://github.com/webex/components/commit/4f20a1c))

# [1.2.0](https://github.com/webex/components/compare/v1.1.0...v1.2.0) (2019-08-07)


### Features

* **release:** install and configure changlelog and git plugins ([c5bbee4](https://github.com/webex/components/commit/c5bbee4))
