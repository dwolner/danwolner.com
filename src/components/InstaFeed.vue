<template>
    <div v-if="feed && feed.length" id="instafeed" style="width: 100%; position: relative;">
        <div style="position: absolute; right: 0; z-index: 999; height: 100%;">
            <q-btn @click="scrollFeed()" style="padding: .5rem 0; background: rgba(0, 0, 0, .5); height: 100%;">
                <q-icon :name="`fas fa-chevron-right`" color="white" />
            </q-btn>
        </div>
        <div id="scroller" style="width: 100%; overflow-x: auto; position: relative;">
            <div style="width: max-content;">
                <div
                    class="cursor-pointer relative-position"
                    :style="`height: ${$q.screen.width > 1024 ? '300' : '150'}px; width: ${$q.screen.width > 1024 ? '300' : '150'}px; float: left; overflow: hidden;`"
                >
                    <div class="centerHeader" align="center" :style="`width: 100%; padding: ${$q.screen.width > 1024 ? '1rem 2.5rem' : '.6rem'};`" @click="selectItem()">
                        <q-icon class="text-grey q-mb-lg" name="fab fa-instagram" size="lg" />
                        <p align="center" class="text-grey" :style="`font-size: ${$q.screen.width > 1024 ? '1' : '.9'}rem; margin: 0;`">
                            Follow Us on Instagram
                        </p>
                    </div>
                </div>
                <div
                    class="cursor-pointer"
                    v-for="(item, index) in feed"
                    :key="index"
                    :style="cardStyle"
                    @mouseover="hoverVideoInsta(item)"
                    @mouseleave="leaveVideoInsta(item)"
                >
                    <div class="relative-position" style="height: 100%;">
                        <video v-if="item.media_type === 'VIDEO'" :id="`instaVideo_${item.id}`" :src="`${item.media_url}`" preload="metadata" loop="loop" muted playsinline style="height: 100%;" />

                        <img v-else :src="`${item.media_url}`" style="width: 100%;" />

                        <div class="absolute" style="bottom: 0; right: 0; z-index: 999;">
                            <q-btn style="padding: .5rem 0; background: rgba(0, 0, 0, .25);" @click="selectItem(item)">
                                <q-icon :name="`fas ${item.media_type === 'VIDEO' ? 'fa-play' : 'fa-image'}`" color="white" />
                            </q-btn>
                        </div>

                        <div class="centerHeaderHold" :style="`padding: ${$q.screen.width > 1024 ? '1.5rem' : '.3rem'};`">
                            <div :style="`border: solid ${$q.screen.width > 1024 ? '2' : '1'}px white; height: 100%;`">
                                <div class="centerHeader" :style="`padding: ${$q.screen.width > 1024 ? '1rem 2.5rem' : '.6rem'};`">
                                    <p align="center" class="text-white" :style="`font-size: ${$q.screen.width > 1024 ? '1' : '.6'}rem; margin: 0;`">{{ item.caption.substring(0, 200) }}...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'InstaFeed',

    data() {
        return {
            feed: [],
            accessToken: 'IGQVJWY19NTFZAqcDQ4M2hyZAEtUdTA0dVJvQmprRGJFbXVmTi1DRjNURlFkSWRuQ0VGMUtyTldEQ1pUOHNsdExMUFFBaU8zTjRsMEZAFOTRiWm5FUVJjMEJGSWVNMmdJTkg2b1N6WGVsRklDZAnY3NXJIek1BcGZAtNGF1bnow',
        }
    },

    computed: {
        cardStyle() {
            return `height: ${ this.$q.screen.width > 1024 ? '300' : '150' }px; width: ${ this.$q.screen.width > 1024 ? '300' : '150' }px; float: left; overflow: hidden;`
        }
    },

    methods: {
        getInstaFeed(cb) {
            this.api.get(`https://richardelias.com/api/instaFeed`, res => {
                console.log('getInstaFeed: ', res)
                cb(res)
            })
        },

        hoverVideoInsta(item) {
            console.log('hoverVideoInsta: ', item)
            if (item.media_type === 'VIDEO') document.getElementById(`instaVideo_${item.id}`).play()
        },

        leaveVideoInsta(item) {
            console.log('leaveVideoInsta: ', item)
            if (item.media_type === 'VIDEO') document.getElementById(`instaVideo_${item.id}`).pause()
        },

        selectItem(item) {
            console.log('select insta item: ', item)
            window.open(item ? item.permalink : `https://www.instagram.com/richardeliasteam/`, '_blank')
        },

        scrollFeed(id, extraOffset) {
            var elmnt = document.getElementById('scroller')
            elmnt.scroll({
                top: 0,
                left: (elmnt.scrollLeft += 300),
                behavior: 'smooth',
            })
        },
    },

    watch: {
        feed() {
            console.log('FEED: ', this.feed)
        },
    },

    created() {
        this.getInstaFeed((res) => {
            if (res.success) {
                this.feed = res.body.sort((a, b) => {
                    return dayjs(b.timestamp).valueOf() - dayjs(a.timestamp).valueOf()
                })
            }
        })
    },
}

</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
#scroller::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE and Edge */
#scroller {
    -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
    -ms-overflow-style: none;
}
</style>
