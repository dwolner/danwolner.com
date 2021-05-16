<template>
  <q-page style="height: calc(100vh - 50px); overflow: hidden;">

      <div id="reelContainer">
          <video autoplay muted loop id="reelBackground">
            <source src="statics/media/dannoschmanno_cinematic_reel_2018_no_title.mp4" type="video/mp4">
          </video>
      </div>

      <div class="scroll" style="height: 100vh;">
          <q-scroll-observable @scroll="userHasScrolled" />

          <div class="bg-grey-3" :style="`padding: 1rem; ${windowWidth < 992 ? 'margin-top: 24rem;' : windowWidth < 1200 ? 'margin-top: 31rem;' : 'margin-top: 37rem;'}`">
              <div id="DWLogo" align="center" style="margin-top: -4rem;">
                    <q-btn
                        round
                        size="xl"
                        class="bg-grey-7"
                        inverted
                        :style="`font-size: 2rem; overflow: visible; background: #F1863E !important; opacity: ${scrollPosition < scrollLimit ? '1' : '0'}`"
                    >
                        <img align="center" src="statics/media/DW_logo.png" style="max-height: 70px;">
                    </q-btn>
              </div>

              <div id="aboutSection" class="bg-grey-3" align="center" style="margin: 2rem 0;">
                  <h2 class="dividerHeader" style="margin: .5rem;" align="center"><span><q-icon name="fas fa-user" style="color: #34728D;" /></span></h2>
                  <h4 style="margin: 1rem;" align="center">WHO AM I?</h4>

                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-5" :align="windowWidth < 768 ? 'center' : 'right'" style="padding: .5rem;">
                          <img class="shadow-5" src="statics/media/dan_drone.jpg" :style="`width: 100%; max-width: ${windowWidth < 768 ? '170px' : '225px'}; border-radius: .5rem;`" />
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-7" :align="windowWidth < 768 ? 'center' : 'left'" style="padding: .5rem;">
                          <h6 style="margin: .5rem 0;">Hi I'm Danno!</h6>
                            <h6 style="margin: .5rem 0;">I am a <span style="margin: .5rem 0; opacity: .4;">web developer / designer / photographer / drone pilot / videographer / maker / dance move enthusiast /</span></h6>
                          <h6 style="margin: .5rem 0; font-size: 2rem;">CREATOR.</h6>
                          <h6 style="margin: .5rem 0;">I made this.</h6>
                          <h6 style="margin: .5rem 0;">I create videos, images, experiences to engage, inspire and energize.</h6>
                          <h6 style="margin: .5rem 0;">Check out some of my work below and give me a shout:</h6>
                          <SocialMedia />
						  <h6 style="margin: .5rem 0; "><a href="/statics/media/Daniel_Wolner.cv" target="_blank" style="color: #34728D;">Dan_Wolner.cv (resume)</a><q-icon name="fas fa-chevron-right" style="color: #34728D;" /></h6>
                      </div>
                  </div>
              </div>

              <div id="videoSection" align="center" style="margin: 0;">
                  <h2 class="dividerHeader" style="margin: .5rem;" align="center"><span><q-icon name="fas fa-palette" style="color: #34728D;" /></span></h2>
                  <h4 style="margin: .5rem;" align="center">PORTFOLIO</h4>

                  <div :align="windowWidth < 768 ? 'center' : 'right'" style="opacity: .4; padding: 0 .5rem;">
                      <q-btn flat size="xs"><h6 style="margin: 0; font-size: .9rem; font-weight: 900;">#{{selectedTag}}</h6></q-btn>
                      <q-btn flat size="xs" v-for="tag in allTags" v-if="tag !== selectedTag" @click="selectTag(tag)"><h6 style="margin: 0; font-size: .9rem;">#{{tag}}</h6></q-btn>
                  </div>

                  <transition-group
                     v-if="!contentLoad"
                     id="contentGrid"
                     class="row justify-center"
                     name="staggered-fade"
                     tag="div"
                     v-bind:css="false"
                     v-on:before-enter="beforeEnter"
                     v-on:enter="enter"
                     >

                     <div
                         class="col-xs-6 col-sm-4 col-md-3 mediaItem"
                         align="center"
                         v-for="(item, index) in contentToDisplay"
                         :key="index"
                         :data-index="index"
                         style="cursor: pointer;"
                         @click="viewSingleItem(item)"
                     >
                        <div class="shadow-5 relative-position" style="height: 100%;">
                            <img v-if="item.imageFilename" :src="`statics/media/${item.imageFilename}`" />

                            <video v-if="item.videoPreviewFilename" autoplay muted loop width="100%">
                                <source :src="`statics/media/${item.videoPreviewFilename}`" type="video/mp4">
                            </video>

                            <!-- <iframe v-if="item.url" :src="item.url" width="100%" height="100%" frameborder="0" style="margin-bottom: -5px;"></iframe> -->

                            <div style="position: absolute; bottom: .25rem; right: .25rem;">
                                <span v-if="tag !== 'featured'" v-for="tag in item.tags" class="text-white" style="margin: 0; font-size: .7rem;">#{{tag}}&nbsp</span>
                            </div>

                            <div class="centerHeaderHold">
                                <div class="headerFrame">
                                    <img v-if="item.overlayFilename" :src="`statics/media/${item.overlayFilename}`" style="height: 100%; width: auto; transform: scale(0.7);" />

                                    <div v-else class="centerHeader">
                                        <h6 class="text-white" style="margin: .5rem; letter-spacing: 0.4rem;">{{item.title}}</h6>
                                        <!-- <span v-for="tag in item.tags" class="text-white" @click="selectTag(tag)" small style="margin: .5rem; cursor: pointer;">#{{tag}}</span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>

            </div>

            <div id="instagramFeed" style="margin: 2rem 1rem 4rem;">
                <h2 class="dividerHeader" style="margin: .5rem;" align="center"><span><q-icon name="fab fa-instagram" style="color: #34728D;" /></span></h2>
                <h4 style="margin: .5rem;" align="center">FEED</h4>

                <div class="row" style="width: 100%; max-width: 992px; margin: 0 auto;">
                    <div class="col-12 embedsocial-hashtag" data-ref="c0b3072d5f128130493b32389dafd4cfd8d5c4a3" ><a class="feed-powered-by-es" href="https://embedsocial.com/products/embedfeed/" target="_blank" title="Powered by EmbedSocial">Powered by EmbedSocial<span>→</span></a></div>
                </div>
            </div>

            <q-modal
              v-model="showSingleItem"
              :content-css="{ minWidth: '100vw', minHeight: '100vh', background: 'rgba(0,0,0, 1)'}"
            >
                <q-modal-layout v-if="showSingleItem">
                    <q-toolbar slot="header" style="background: rgba(0,0,0,0) !important; padding: 1rem;">
                        <!-- <img align="center" alt="Meanwhile logo" src="statics/media/MEANWHILE-GLITCH-slower_edit.gif" style="max-height: 150px; margin: -2rem;"> -->

                        <q-toolbar-title>
                        </q-toolbar-title>

                        <q-btn flat @click="showSingleItem = false">
                            <q-icon name="fas fa-times" color="white" style="font-size: 1.5rem;" />
                        </q-btn>
                    </q-toolbar>

                    <div style="padding: 1rem;" align="center">
                        <h6 class="text-white">{{singleItem.title}}</h6>

                        <img v-if="singleItem.imageFilename" :src="`statics/media/${singleItem.imageFilename}`" style="width: 100%;" />

                        <iframe v-if="singleItem.embedURL" :src="singleItem.embedURL" width="100%" :height="windowWidth < 768 ? '320' : '720'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        <video v-if="singleItem.videoFilename" autoplay controls width="100%" style="max-width: 1280px; margin: 0 auto;">
                            <source :src="`statics/media/${singleItem.videoFilename}`" type="video/mp4">
                        </video>

                    </div>
                </q-modal-layout>
            </q-modal>
          </div>
      </div>


  </q-page>
</template>

<script>
import SocialMedia from '../components/SocialMedia'
import OnScreen from 'onscreen'

const os = new OnScreen()

export default {
    name: 'PageIndex',

    props: ['urlTag'],

    components: { SocialMedia },

    data() {
        return {
            contentLoad: false,
            selectedTag: 'featured',
            singleItem: '',
            showSingleItem: false,

            shuffle(array) {
              var currentIndex = array.length, temporaryValue, randomIndex;

              // While there remain elements to shuffle...
              while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }

              return array;
            }
        }
    },

    computed: {
        windowWidth() {
            return this.$store.state.windowWidth
        },

        scrollPosition() {
            return this.$store.state.scrollPosition
        },

        scrollLimit() {
            return this.windowWidth < 992 ? '350' : this.windowWidth < 1200 ? '450' : '550'
        },

        content() {
            return this.$store.state.content
        },

        contentToDisplay() {
            return this.selectedTag
                ? this.shuffle(this.content.filter(item => {
                      return item.tags.includes(this.selectedTag)
                  }))
                : []
        },

        allTags() {
            let allTags = []
            this.content.forEach(item => {
                item.tags.forEach(tag => {
                    if (!allTags.includes(tag)) allTags.push(tag)
                })
            })

            return allTags
        },
    },

    methods: {
        viewSingleItem(item) {
            if (item.url) {
                window.open(item.url, '_blank')
            } else {
                this.singleItem = item
                this.showSingleItem = true
            }
        },

        selectTag(tag) {
            // this.$router.push(`/filter/${tag}`);

            this.selectedTag = ''
            this.$nextTick(() => {
                this.selectedTag = tag
            })
        },

        beforeEnter(el) {
            el.style.opacity = 0
            // el.style.backgroundColor = "#000";
        },

        enter(el, done) {
            console.log('ENTER: ', el, done)
            var delay = el.dataset.index * 50
            setTimeout(() => {
                this.Velocity(el, { opacity: 1 }, { easing: 'easeInSine', complete: done })
            }, delay)
        },

        userHasScrolled(scroll) {
            console.log('userHasScrolled: ', scroll)
            this.$store.commit('scrollPosition', scroll.position)
        }
    },

    watch: {
        urlTag() {
            if (this.urlTag) {
                this.selectedTag = ''
                this.$nextTick(() => {
                    this.selectedTag = this.urlTag
                })
            }
        },
    },

    created() {
        os.on('leave', '#DWLogo', this.hideDWLogo)

        console.log('TAG? ', this.urlTag)

        if (this.urlTag) {
            this.selectedTag = ''
            this.$nextTick(() => {
                this.selectedTag = this.urlTag
            })
        }

		let instaScript = document.createElement('script'); 
			instaScript.id = "EmbedSocialHashtagScript"; 
			instaScript.src = "https://embedsocial.com/cdn/ht.js"; 
			document.getElementsByTagName("head")[0].appendChild(instaScript);
    },
}
</script>

<style>
#reelBackground {
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -100;
    right: 0;
    bottom: 0;
    /* background: url('../statics/media/meanwhile_icon.png') no-repeat center center; */
    background-size: cover;
    overflow: hidden;
}

#reelContainer {
    height: 600px;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
}

#contentGrid {
    padding: 1rem;
}

.mediaItem {
    position: relative;
    padding: 0.5rem;
}

.mediaItem img {
    border-radius: 0.25rem;
    max-width: 100%;
    width: 100%;
    margin-bottom: -6px;
}

.mediaItem video {
    border-radius: 0.25rem;
    max-width: 100%;
    width: 100%;
    margin-bottom: -6px;
}

.centerHeaderHold {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    -webkit-transition: background 0.5s, opacity 0.5s;
    transition: background 0.5s, opacity 0.5s;
}

.headerFrame {
    border: 1px solid #fff;
    height: 100%;
    width: 100%;
}

.centerHeader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 90%;
}

.centerHeaderHold:hover {
    opacity: 1;
}

@media only screen and (max-width: 1200px) {
    #reelContainer {
        height: 500px;
    }
}

@media only screen and (max-width: 992px) {
    #reelContainer {
        height: 400px;
    }
}

.dividerHeader {
    position: relative;
    z-index: 0;
    margin: 3rem 0;
}

.dividerHeader:before {
    border-top: 2px solid #cfcfcf;
    content: '';
    margin: 0 auto;
    /* this centers the line to the full width specified */
    position: absolute;
    /* positioning must be absolute here, and relative positioning must be applied to the parent */
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    width: calc(100% - 1rem);
    z-index: -1;
}

.dividerHeader span {
    /* to hide the lines from behind the text, you have to set the background color the same as the container */
    background: #efefef;
    padding: 0 1rem;
}
</style>
