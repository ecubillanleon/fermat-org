/// <reference path="../../common/helper.d.ts" />
/// <reference path="../../common/cli.d.ts" />
/// <reference path="../../common/constants.d.ts" />

interface UserData {
    __v: string
    _id: string,
    axs_key: string,
    name: string,
    avatar_url: string,
    email: string,
    github_tkn: string,
    usrnm: string
}

interface CookieData {
    _id: string,
    axs_key: string,
    upd_at: string,
    userData: UserData
}