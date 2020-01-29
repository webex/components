# [1.34.0](https://github.com/webex/components/compare/v1.33.0...v1.34.0) (2020-01-29)


### Bug Fixes

* **hooks:** modify useMeeting so it will not create new meetings ([49b5559](https://github.com/webex/components/commit/49b5559f31bc17f233021651bc62836bf688e0de))
* **MeetingsJsonAdapter:** update mute controls correct display ([f2dc0b5](https://github.com/webex/components/commit/f2dc0b53821664a7183e3935cd2b34f940023444))
* **WebexMeeting:** update to only use useMeetingDestination ([4b563fe](https://github.com/webex/components/commit/4b563fec83633b2f6ebed59d1a2ddb28ddf6eaa0))


### Features

* **hooks:** add useMeetingDestination ([52e9851](https://github.com/webex/components/commit/52e98512de3e7c145e52db7a45fc4b0877b81b28))
* **MeetingJsonAdapter:** modify getMeeting to complete when meeting is left ([b66455f](https://github.com/webex/components/commit/b66455f2912f443edc4783cb06b8794e3bd89f3e))

# [1.33.0](https://github.com/webex/components/compare/v1.32.1...v1.33.0) (2020-01-29)


### Bug Fixes

* **package:** update @webex/component-adapter-interfaces to 1.9.0 ([65375ff](https://github.com/webex/components/commit/65375ff2dd7ca752340d359e7e2f233b34f62bc5))


### Features

* **MeetingsJsonAdapter:** remote addLocalMedia() ([d33d7ce](https://github.com/webex/components/commit/d33d7cef493cc89232a731ad559840a3efc90174))

## [1.32.1](https://github.com/webex/components/compare/v1.32.0...v1.32.1) (2020-01-28)


### Bug Fixes

* **package:** fix some volunerabilities ([d2929d3](https://github.com/webex/components/commit/d2929d3b84a300269e3bd4dba47820e9f4519e6e))

# [1.32.0](https://github.com/webex/components/compare/v1.31.0...v1.32.0) (2020-01-25)


### Features

* **WebexMedia:** add autoPlay property to the media tags ([f48299c](https://github.com/webex/components/commit/f48299c050d68245ed398665f673b1344afba3af))
* **UsePerson:** convert PersonStatus keys to values ([ed1cbc5](https://github.com/webex/components/commit/ed1cbc5cd63ba33af0d78da64b44b9dbf3a05ecc))
* **UseStream:** remove play method from the hook ([0e3e137](https://github.com/webex/components/commit/0e3e137159c7e529e7834aab86b6131fc2ac22f6))

# [1.31.0](https://github.com/webex/components/compare/v1.30.0...v1.31.0) (2020-01-23)


### Bug Fixes

* **UseStream:** no action needed when the video is unmounted ([ff14955](https://github.com/webex/components/commit/ff14955a36341dbb869e1bc9a6ba39c3ac618eef))


### Features

* **MeetingJsonAdapter:** add more controls functionalities and display ([f0ec657](https://github.com/webex/components/commit/f0ec6574e828a6b697efb9132148e7e4f298f510))
* **UseMeeting:** add OnMeeting method ([f6368e3](https://github.com/webex/components/commit/f6368e3c06760a06e76e0bc03036f3327898bfe1))
* **MeetingControls:** add parent div to wrap the controls ([cc60179](https://github.com/webex/components/commit/cc6017968ba81aae12ff10b4c9ca6e282c5c7125))
* **UseMeetingControls:** check for available controls ([c0599d5](https://github.com/webex/components/commit/c0599d5347ad2ea17d9af25155f0664f1f3c560d))
* **Meeting:** implement one ([338b85d](https://github.com/webex/components/commit/338b85dd274de1cbbe80128325d180cd7bed529e))

# [1.30.0](https://github.com/webex/components/compare/v1.29.1...v1.30.0) (2020-01-22)


### Features

* **MeetingJson:** add remoteMedia object ([15b9064](https://github.com/webex/components/commit/15b9064bc59bd49dfb2bd653d3d068784e246f89))
* **WebexInMeeting:** implement one ([cc5e17e](https://github.com/webex/components/commit/cc5e17e0af7d8eb5514afac4890070c6152f09cc))

## [1.29.1](https://github.com/webex/components/compare/v1.29.0...v1.29.1) (2020-01-15)


### Bug Fixes

* **InterstitialMeeting:** meetingDest prop is replaced with meetingID ([69dd4e5](https://github.com/webex/components/commit/69dd4e5cf01958f6d01e8978c6f9a75b44fd7ca6))

# [1.29.0](https://github.com/webex/components/compare/v1.28.0...v1.29.0) (2020-01-13)


### Bug Fixes

* **LocalMedia:** display spinner while user ID is retrieved ([120c46a](https://github.com/webex/components/commit/120c46aedb1d564fd89186ecc81633efd3ce2ed8))


### Features

* **Interstitial:** add interstitial meeting component ([dfa81d3](https://github.com/webex/components/commit/dfa81d3b34b8532be79844094d8ac3462705e89c))
* **hooks:** getMeeting takes a destination to create a meeting ([beebe6f](https://github.com/webex/components/commit/beebe6f911835cbf0bf95a53edb29cf06d907a1e))
* **MeetingsJsonAdapter:** implement addLocalMedia ([f825faa](https://github.com/webex/components/commit/f825faa792ac65af930a618b22758c6028b55f4c))
* **MeetingsJsonAdapter:** implement createMeeting ([22fad7f](https://github.com/webex/components/commit/22fad7f01bd1fb076064c25a79af4d3673b18725))
* **MeetingJsonAdapter:** remove mute property from the media ([bdd435e](https://github.com/webex/components/commit/bdd435e457295016b6e3ae4dd0dfb26ac414029b))

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
