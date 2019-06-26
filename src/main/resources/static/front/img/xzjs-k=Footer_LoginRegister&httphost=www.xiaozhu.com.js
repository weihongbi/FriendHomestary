 
 var topLevelDomain = "http://jci.xiaozhustatic1.com/e19061101/xiaozhu.com";
var domain = "http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com";
var webimIframUrl = window.location.protocol+"//xiaozhu.com/webim.html";
var uploadImageUrl = "https://imageupload.xiaozhu.com/imgin4uploadify.php";
var jciUrl = "http://jci.xiaozhustatic3.com/";
var webimYUI = "{{{webimYUI}}}";
var webimV2 = "{{{webimV2}}}";
var client_id_youku = '16edde5f79e61324'; 

document.domain = topLevelDomain;

var hostArray = window.location.hostname.split('.');
if (hostArray.length == 5 && hostArray[2] == 'partner') {
    topLevelDomain = hostArray[1] + '.' + hostArray[2] + '.xiaozhu.com';
} else if (hostArray.length == 4 && hostArray[1] == 'partner') {
    topLevelDomain = hostArray[0] + '.' + hostArray[1] + '.xiaozhu.com';
}

if (typeof(window.jQuery) != "undefined")
{
    if ($("#head_newmsg2"))
    {
        $("#head_newmsg2").hover(
            function () {
                $("#head_newmsg2 a.icon_arrowB").addClass("nav_current");
                $("#head_newmsg2 a.icon_arrowB").removeClass("icon_arrowB");
                $("#head_newmsg2 div.nav_pop ").show();
            },
            function () {
                $("#head_newmsg2 a.nav_current").addClass("icon_arrowB");
                $("#head_newmsg2 a.nav_current").removeClass("nav_current");
                $("#head_newmsg2 div.nav_pop ").hide();
            }
        );
    }
}

function tipBackyardSuccess(classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_right';

    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardError(errmsg,classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_error';

    $('.'+classname).html(errmsg);
    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardReset(classnameSucc, classnameErr)
{
    if (typeof(classnameSucc) == 'undefined' || classnameSucc == '')
        classnameSucc = 'tips_right';
    $('.'+classnameSucc).hide();

    if (typeof(classnameErr) == 'undefined' || classnameErr == '')
        classnameErr = 'tips_error';
    $('.'+classnameErr).hide();

}
function loadNyroModal()
{
}

//百度站长统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "hm.js-92e8bc890f374994dd570aa15afc99e1.js"/*tpa=https://hm.baidu.com/hm.js?92e8bc890f374994dd570aa15afc99e1*/;
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

 
 var XZWebUrlWriter = {
    getWebPhp : function () {
        return 'http://jci.xiaozhustatic1.com/e19061101/xzweb.php';
    },
    getAjaxPhp : function () {
        return '/ajaxRequest/';
    },
    getRequest : function(url,type) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){returnData = datas;},
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getRequestSpider : function(busiKey,isReload,url,type, cb, reRequest) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;
        }
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){
                captchaInterceptors(busiKey,isReload, datas, function () {
                    that.getRequestSpider(busiKey,isReload,url,type, cb, true);
                }, function () {
                    returnData = datas;
                    if (reRequest && cb) {
                        cb();
                    }
                });
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postRequest : function(url,requestParam) {
        if (!requestParam) var requestParam = {};
        var nexturl = $('input[name=next]').val();
        if (nexturl) requestParam.next = nexturl;
        var that =this;
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : requestParam,
            dataType : 'json',
            async    : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            window.location.href = reaponseHeader;
        }
    },
    headTest_ReqUrl :function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckBlock';
    },
    getWebIm_ServerUrl: function() {
        return window.location.protocol+'//'+domain+'/webim.php?op=getServerUrl';
    },
    getWebIm_DrawIframeUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawIframe&userid=' + userid;
    },
    getWebIm_DrawBaseBtnUrl: function(next) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawImBaseBtn&next=' + next;
    },
    getWebIm_DrawZhunaIframeUrl : function () {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawZhunaIframe';
    },
    getWebIm_IframeUrl : function (userId) {
        return webimIframUrl;
    },
    getWebIm_LodgeUnitData: function (roomid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitData&roomid=' + roomid;
    },
    getWebIm_FavoriteList: function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteList&userid=' + userid;
    },
    getWebIm_FavoriteGroupDetail: function (groupId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteGroupDetail&groupId=' + groupId;
    },
    getWebIm_RequestNotificationUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getNotification&terminal=all_web&userid=' + userid;
    },
    getWebIm_RequestUserSysNoticeCnt : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNoticeCnt&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_RequestUserSysNotice : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNotice&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_UserData : function(userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserData&userid=' + userid;
    },
    getWebIm_talkHis : function(isTenant,offset,length) {
        return window.location.protocol+'//'+doamin+'/webim.php?op=loadTalkHis&isTenant=' + isTenant + '&offset=' + offset + '&length=' + length + '&userId=' + currentUser;
    },
    getWebIm_talkMagHis: function(tenantId,luId,length,lastMessageId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=loadTalkMsgHis&tenantId= ' + tenantId + '&luId=' + luId +'&length=' + length + '&lastMessageId= ' + lastMessageId;
    },
    getWebIm_TalkHisUrl : function (landlordid, tenantid, objid, userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getTalkHisUrl&landlordid=' + landlordid + '&tenantid=' + tenantid + '&objid=' + objid + '&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getFkScreenListUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ChatSet' + '&_t=' + new Date().getTime();
    },
    getWebIm_RequestFastReplyUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFastReply&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getWebIm_FangDongSpecialLodgeUnitUrl : function (userid) {
        return window.location.protocol+"//" + topLevelDomain + "/fangdong/" + userid +"/fangzi.html";
    },
    getWebIm_RequestRecommendLuUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getRecommendLuList&userid=' + userid;
    },
    getWebIm_RequestUserStateUrl : function (userid,imuserrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserState&userid=' + userid + '&imuserrole=' + imuserrole;
    },
    getWebIm_RequestSynTalkMsgUrl: function (userid,synMinTime,synMaxTime) {
        return window.location.protocol+'//'+domain+'/webim.php?op=SynTalkMsg&userId=' + userid + '&synMinTime=' + synMinTime + '&synMaxTime=' + synMaxTime;
    },
    getWebIm_RequestTalkMsgSetRead: function(tenantId,luId,isTenant) {
        return window.location.protocol+'//'+domain+'/webim.php?op=talkMsgSetRead&tenantId=' + tenantId + '&luId=' + luId + '&isTenant=' + isTenant + '&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustZMInfoPair : function (applyUserId,ownerUserId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetZminfo_Pair?applyUserId=' + applyUserId + '&ownerUserId='+ownerUserId+'&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustLayer : function (landlordid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAlipayTrustLayer&landlordid=' + landlordid + '&_t=' + new Date().getTime();
    },
    getWebIm_CheckKeywordUrl : function (dataArr, type) {
        return 'https://greatwall.xiaozhu.com/greatwall.php?content=' + JSON.stringify(dataArr) + '&type=' + type + '&_t=' + new Date().getTime();
    },
    getWebIm_AllFriendAndLuData : function (allfriendid,allluid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData';
        // return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData&userlist=' + allfriendid + '&lulist=' + allluid + '&_t=' + new Date().getTime();
    },
    getOperateScreen: function (toUserId,operate) {
        return window.location.protocol+'//'+domain+'/webim.php?op=doOperateImScreen&toUserId=' + toUserId+ '&operate=' + operate+ '&_t=' + new Date().getTime();
    },
    checkIsInScreenList: function (toUserId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=checkIsInScreenList&toUserId=' + toUserId+ '&_t=' + new Date().getTime();
    },
    getLodgeUnitState: function(luId){
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitState&luId=' + luId+ '&_t=' + new Date().getTime();
    },
    getWeb_NoticeReachedFeedbackUrl : function (timerid,operate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=NotificationReachedFeedback&timerid=' + timerid + '&operate=' + operate;
    },

    getWeb_InfoEventReachUrl : function (timerid,operate,receiverId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=InfoEventReach&timerid=' + timerid + '&operate=' + operate + '&receiverid='+receiverId;
    },

    getInfoEventDealActionUrl : function (dealaction,objid,objtype,receiverid,displaystrategy) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=GetInfoEventDealActionUrl&dealaction=' + dealaction + '&objid=' + objid + '&objtype=' + objtype + '&receiverid=' + receiverid + '&displaystrategy='+displaystrategy;
    },

    getWeb_FangDong_FangDong_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowLetter';
    },
    getWeb_FangKe_FangKe_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowLetter';
    },
    getWeb_FangKe_Special_Index: function(tenantid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangKe_Special_Index&tenantid=' + tenantid;
    },
    getWeb_FangDong_Special_Index: function(landlordid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangDong_Special_Index&landlordid=' + landlordid;
    },
    getWeb_FangDong_ResetFastReplyUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ChatSet';
    },
    getWeb_FangDong_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowSysNotice';
    },
    getWeb_FangKe_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowSysNotice';
    },

    getWeb_FangKe_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DoPostComment';
    },
    getWeb_FangDong_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_DoPostComment';
    },
    getWeb_FangKe_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Index';
    },
    getWeb_FangDong_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Index';
    },
    getWeb_FavoriteGroupDetailUrl : function (groupId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Favorite_MyFavoriteDetail&groupId='+groupId;
    },
    getWeb_FavoriteGroupListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_MyFavorite';
    },

    //打开点评详情页
    getWeb_FangKe_AddCommentUrl : function (bookorderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment_Self&bookorderId=' + bookorderId + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_DeleteTenantUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DeleteUserTenant&tenantId=' + tenantId;
    },
    getWeb_FangKe_UserTenantDetailUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserTenantDetail&tenantId=' + tenantId;
    },
    getWeb_FangKe_EditUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,mobile,phonecode) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&mobile=' + mobile + '&phonecode=' + phonecode + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_EditUserTenantAfterOverseaUrl : function (tenantId,realName,mobile,sex,birth,oversea,nation,mobileNation,IDCardNo,passportNo) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenantAfterOversea&tenantId=' + tenantId + '&realName=' + realName + '&mobile=' + mobile + '&sex=' + sex + '&birth=' + birth + '&oversea=' + oversea + '&nation=' + nation + '&mobileNation=' + mobileNation + '&IDCardNo=' + IDCardNo + '&passportNo=' + passportNo + '&random=' +new Date().getTime();
    },
    getWeb_FangKe_EditHaiwaiUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,email) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&email=' + email + '&random=' + new Date().getTime();
    },
    getWeb_GetCityUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelCityJson&provinceid=' + provinceId ;
    },
    getFangDong_CutUserHeadImageFrameUrl : function (headImageUrl) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutUserHeadImageFrame&headImageUrl='+headImageUrl;
    },
    /*07-03*/
    getFangDong_SetNoticeSetUrl : function (smsLodgeunitSucc,smsBookorderTimeout,smsPayTimeout,smsNewComment,emailLodgeunitSucc,emailBookorderTimeout,emailPayTimeout,emailNewComment) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_NoticeSetSub&sms_lodgeunitsucc='+smsLodgeunitSucc+'&sms_bookordertimeout='+smsBookorderTimeout+'&sms_paytimeout='+smsPayTimeout+'&sms_newcomment='+smsNewComment+'&email_lodgeunitsucc='+emailLodgeunitSucc+'&email_bookordertimeout='+emailBookorderTimeout+'&email_paytimeout='+emailPayTimeout+'&email_newcomment='+emailNewComment+'&random'+new Date().getTime();
    },
    getFangDong_OrderByStateUrl : function (orderState,pageNo,sortType) {
        sortType = ('undefined' !== typeof sortType) ? sortType : "";
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderByState&orderState='+orderState+'&sortType='+sortType+'&p='+pageNo+'&random='+new Date().getTime();
    },
    getFangDong_PayListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_PayList';
    },
    getFangDong_SetBankPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetBankPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_SetAlipayPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetAlipayPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_GetTenpayInfoUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_GetTenpayInfo&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_CleanServiceAddOrder_step2Url : function(luId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceAddOrder_step2&luId='+luId;
    },
    getFangDong_CleanServiceOrderDetailRefreshState : function(orderId,lastState) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetailRefreshState&lastState='+lastState+'&orderId='+orderId;
    },
    getFangDong_IsCanClean : function (){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderGetIsCanClean';
    },
    getFangDong_UserInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_UserInfo';
    },
    getFront_Login_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Kernel';
    },
    getFront_Register_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Register_Kernel';
    },
    getFront_DetailPageMapUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_DetailPageMap&id='+luid;
    },
    getFront_Login_SubmitUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Submit';
    },
    getFront_BookOrderPayFail : function (orderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_BookOrderPayFail&bookorderid='+orderId;
    },
    getFangDong_FlashBookUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_FlashBook';
    },

    getAjax_RegisterWithPhoneAndPass : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RegisterWithPhoneAndPass';
    },
    /* dpv2
    getAjax_SendCommentShareUrl : function (commentid, source) {
        return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SendCommentShare&commentid='+commentid+'&source='+source+'&random='+new Date().getTime();
    },
    可能废弃 或者是张晨的分享
    */
    getAjax_CommentShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_CommentFangKeShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentFangKeShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundShowUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundShow?bookOrderId='+bookOrderId;
    },
    getAjax_SaveDefaultUserHeadImageUrl : function (imgId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveDefaultUserHeadImage?id='+imgId;
    },
    getAjax_SaveUserHeadImageUrl : function (imgurl, gcx, gcy, gcw, gch) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveUserHeadImage?imgurl='+encodeURIComponent(imgurl)+'&x='+gcx+'&y='+gcy+'&w='+gcw+'&h='+gch;
    },
    /*07-03*/
    getAjax_DelCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelComment';
    },
    getAjax_BookOrderCancelReasonUrl : function (bookorderId, rejectType, rejectText) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrderCancelReason?bookorderid='+bookorderId+'&cancelType='+rejectType+'&cancelReason='+encodeURIComponent(rejectText);
    },
    getAjax_RefuseBookOrderSetLuUnBookAble : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RefuseBookOrderSetLuUnBookAble';
    },
    getAjax_FangKe_CheckInCodeVerifyUrl : function (bookorderId,code) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_CheckInCodeVerify?orderid='+bookorderId+'&code='+code;
    },
    getAjax_DelUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelUserPayment?id='+id;
    },
    getAjax_BankCityJsonUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankCityJson?provinceid='+provinceId;
    },
    getAjax_BankJsonUrl : function (bankName,bankProviceId,bankCityId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankJson?banktypeid='+bankName+'&bankprovinceid='+bankProviceId+'&bankcityid='+bankCityId;
    },
    getAjax_CheckTenpayInfoParam : function (tenpayno,tenpayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername;
    },
    getAjax_GetDefaultLandMarkUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDefaultLandMark?domain='+cityDomain;
    },
    /*08-19*/
    getAjax_CheckLodgeUnitUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckLodgeunit?luid='+cityDomain;
    },
    getAjax_CheckSearchConditionUrl : function (searchCity,cityDomain,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition?searchCity='+searchCity+"&cityDomain="+cityDomain+"&startDate="+startDate+"&endDate="+endDate;
    },
    getAjax_BuildFilterSearchUrl : function (partner,startDate,endDate,citydomain,putkey,keywordType,keywordValue,checkedHouseType,checkedfacilities,checkedrentType,guestnum,price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BuildFilterSearch?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&citydomain='+citydomain+'&putkey='+putkey+'&keywordType='+keywordType+'&keywordValue='+keywordValue+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&price='+price;
    },
    getAjax_GetDatas4Map : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4Map?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort;
    },
    getAjax_GetMapDatasLodgeUnit : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4MapLodgeUnit?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_getDatasMapLodgeunit4Page : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDatasMapLodgeunit4Page?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_doFullTextSearch4Map : function (offset,url) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch4Map?offset='+offset+'&url='+encodeURIComponent(url);
    },
    getAjax_GetBookLodgeUnitDetailUrl : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetBookLodgeUnitDetail?lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime();
    },
    getAjax_GetOrderPriceDetailUrl : function (bookOrderId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetOrderPriceDetail?bookOrderId="+bookOrderId+"&rand="+new Date().getTime();
    },
    getAjax_GetLazyInfoUrl : function (memkey,memtimeout,turl) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_LoadInfo?memkey="+memkey+"&memtimeout="+memtimeout+"&turl="+turl;
    },
    getAjax_AddFeedbackUrl : function (problem,contact,imageParam) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Add_Feedback?problem="+problem+"&contact="+contact+"&imageParam="+imageParam;
    },
    getAjax_GetFeedbackUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Get_Feedback";
    },




    getAjax_GetVerifyCode : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_GetVerifyCode?nocache="+new Date().getTime();
    },
    getAjax_CheckMobileExist : function (mobile,nationName,nationCode,source) {
        var source = source ? source : 'normal';
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckMobileExist?mobile=' + mobile + '&nationName=' +nationName+ '&nationCode=' +nationCode + '&source=' +  source;
    },
    getAjax_CheckRegistExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckRegistExist';
    },
    getAjax_CheckUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckUsernameExist?username=' + encodeURIComponent(username);
    },
    getAjax_CheckOldUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckOldUsernameExist?username=' + username;
    },
    getAjax_CheckEmailExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckEmailExist';
    },
    getAjax_CheckVerifyCode : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckVerifyCode';
    },
    getAjax_SendActivateCode : function (mobile, nationName, nationCode, verifyCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendActivateCode?mobile='+ mobile
            +'&nationName=' + nationName + '&nationCode=' + nationCode +'&verifycode='+ verifyCode + '&rand='+new Date().getTime() + '&fromType=pcRegister';
    },
    getAjax_SendAmendPassCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendAmendPassCode?mobile='+ mobile +'&verifycode='+ verifyCode +'&nationName=' + nationName +'&nationCode='+nationCode+ '&rand='+new Date().getTime();
    },
    getAjax_CheckActiveCode : function (mobile,nationName,nationCode,activateCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckActivateCode?mobile='+mobile +'&nationName='+ nationName +'&nationCode=' + nationCode +'&activatecode='+activateCode +'&rand='+new Date().getTime();
    },
    getAjax_CheckInviteCode : function (inviteCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckInviteCode?invitecode='+inviteCode;
    },
    getAjax_SendConfirmCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendConfirmCode?mobile='+ mobile +'&verifycode='+ verifyCode
            +'&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_SendQuickLoginCode : function(mobile, verifyCode,nationName,nationCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendQuickLoginCode?mobile='+ mobile +'&verifycode='+ verifyCode +  '&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_CheckConfirmCode : function (mobile,confirmCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckConfirmCode?mobile='+mobile+'&confirmcode='+confirmCode
            +'&nationName='+ nationName + '&nationCode='+ nationCode +'&rand='+new Date().getTime();
    },
    getAjax_VerifyCodeFirstShow : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_VerifyCodeFirstShow?rand='+new Date().getTime();
    },
    getAjax_Login : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_Login';
    },
    getAjax_LoginMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_LoginMobile';
    },
    getAjax_RegisterByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByMobile';
    },
    getAjax_RegisterByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByEmail';
    },
    getAjax_FindPasswordByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByEmail';
    },
    getAjax_ResetPasswordFromEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordFromEmail';
    },
    getAjax_SendRegValidateEmailUrl : function(email,next){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendRegValidateEmail?email='+encodeURIComponent(email)+'&next='+encodeURIComponent(next)+'&random='+new Date().getTime();
    },
    getAjax_FindPasswordByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByMobile';
    },
    getAjax_AmendPasswordByMobile : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByMobile';
    },
    getAjax_AmendPasswordByEmail : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByEmail';
    },
    getAjax_BindOpenAccount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BindOpenAccount';
    },
    getAjax_OpenAccountRegister : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_OpenAccountRegister';
    },
    getAjax_ReSendActiveEmail : function (uid, uidtoken) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ReSendActiveEmail?uid=' + uid + '&uidtoken=' + uidtoken;
    },
    getAjax_ChangeActiveEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeActiveEmail';
    },
    getAjax_CheckIllegalUser : function (bidType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIllegalUser?bidType=' + encodeURIComponent(bidType);
    },













    getAjax_CheckNickNameUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckNickName";
    },

    getAjax_GetPicCheckCodeShowUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_PicCheckCodeShow?nocache="+new Date().getTime();
    },
    getAjax_GetSendMessageAppDownloadUrl: function (mobile,checkcode) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Message_App_Download_Url?mobile="+mobile+"&checkcode="+checkcode+"&rand="+new Date().getTime();
    },
    getAjax_SendSms4AppDownloadUrl: function (mobile,checkcode,apptype) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SendSms4AppDownload?mobile="+mobile+"&checkcode="+checkcode+"&apptype="+apptype+"&rand="+new Date().getTime();
    },
    getAjax_CheckUserPasswordUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckUserPassword';
    },
    getAjax_CheckPhone : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPhone';
    },
    getAjax_CheckEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail?email="+email+"&random="+new Date().getTime();
    },
    getAjax_CheckEmailUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail";
    },
    getAjax_SendActiveEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Active_Email?email="+email;
    },
    getAjax_ReadSysNoticeUrl: function (messageId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_ReadSysNotice?msgId="+messageId;
    },
    getAjax_DelSysNoticeUrl : function (messageId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelSysNotice?msgId='+messageId;
    },
    getAjax_SetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_ResetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ResetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_SmsCheckCodeSendUrl : function (phonenum,nationName,nationCode,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeSend?phone='+phonenum+ '&nationName=' + nationName + '&nationCode=' +nationCode+'&checkcode='+imagecode+'&aisle='+aisle;
    },
    getAjax_SetUserPhoneCodeUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetUserPhoneCode?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_SmsCheckCodeVerifyUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeVerify?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_Front_SendPhoneCode : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendPhoneCode?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_Front_SendPhoneCodeByPhone : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendPhoneCodeByPhone?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_PhoneIsNotExist_PhoneIsLoginUserUrl : function (phonenum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+phonenum;
    },
    getAjax_UnbindSnsOpenIdUrl : function (shareType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UnbindSnsOpenId?shareType='+shareType;
    },
    getAjax_FangKeOrderList_OrderByTimeUrl : function (ordertype, createtype, p) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKeOrderList_OrderByTime?orderType='+ordertype+'&bookOrderCreateType='+createtype+'&p='+p+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundDetailUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundDetail?bookOrderId='+bookOrderId;
    },
    getAjax_FangKe_InsurancePlanUrl : function (bookOrderTenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_InsurancePlan?bookOrderTenantId='+bookOrderTenantId;
    },
    getAjax_FangKe_RejectCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_RejectCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ConfirmCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ConfirmCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ServiceCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ServiceCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_PayCashPledgeUrl : function (bookOrderId,payType,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_PayCashPledge?bookOrderId='+bookOrderId+'&payType='+payType+'&version='+version+'&rand='+new Date().getTime();
    },

    getAjax_GetMoreTalkUrl : function (talkid,rows,requestTime) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMoreTalk?talkid='+talkid+'&rows='+rows+'&_t='+requestTime;
    },
    getAjax_GetSettleAccountDetailUrl : function (orderId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSettleAccountDetail?orderId='+orderId+'&p='+pageNo;
    },
    getAJAX_getSettlementListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlementList';
    },
    getAJAX_getSettlementMonthAccountListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlmentMonthAccount';
    },
    getAjax_createSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_createSettlementAccount';
    },
    getAjax_delSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delSettlementAccount';
    },
    getAjax_FangDong_LuPromotionConditionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_LuPromotionCondition?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_CancelPromotionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_CancelPromotion?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_SelfPromotionUrl : function (luid,avgprice,selfpromotiondiscount,enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_SelfPromotion?luid='+luid+'&avgPrice='+avgprice+'&discount='+selfpromotiondiscount+'&endDay='+enddate+'&random='+new Date().getTime();
    },
    getAjax_ConvertRedPackageUrl : function (userid,convertvalue) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ConvertRedPackage?userid='+userid+'&convertvalue='+convertvalue+'&_t='+new Date().getTime();
    },
    getAjax_FangDong_TenantAuthentication2GuoZhengTongUrl : function (tenantid,realname,cardno) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_TenantAuthentication2GuoZhengTong?tenantid="+tenantid+"&realname="+realname+"&cardno="+cardno;
    },
    getAjax_ShowNewLetterUrl : function (content) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShowNewLetter?content='+encodeURIComponent(content);
    },
    getAjax_DelTalkUrl : function (talkid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelTalk?delid='+talkid;
    },
    getAjax_SetTenpayInfoUrl : function (tenpayno,tenpayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername+'&balanceform='+balanceForm;
    },
    getAjax_CheckAlipayInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_SaveAlipayInfoUrl : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername;
    },
    getAjax_SetAlipayInfoUrl : function (alipayno,alipayusername,balanceForm,id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername+'&balanceform='+balanceForm+'&id='+id;
    },
    getAjax_SetDefaultUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetDefaultUserPayment?id='+id+'&rand='+Math.random();
    },
    getAjax_SetNationalSecurityInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetNationalSecurityInfo';
    },
    getAjax_FangDong_DelMyRoomsUrl : function (roomId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_Del?lodgeunitid='+roomId;
    },
    getAjax_FangDong_MyRoomsSwithStateUrl : function (roomId,switchstr) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_SwithState?lodgeunitid='+roomId+'&switchval='+switchstr+'&random='+new Date().getTime();
    },
    getAjax_FangDong_MyPartRoomsUrl : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FangDong_MyPartRooms?parentId='+lodgeId+'&p='+pageNo;
    },
    getAjax_SetLodgeUnitCalendarUrl : function (lodgeUnitId, startDate, endDate, subPrice, bookable, roomnum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startDate+'&enddate='+endDate+'&price='+subPrice+'&bookable='+bookable+'&housenum='+roomnum+'&random='+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl : function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate;
    },
    getAjax_GetLodgeUnitCalendarUrl : function (lodgeUnitId, startdate, enddate, vstartdate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&editable=true&_vstartdate='+vstartdate+'&_t='+new Date().getTime();
    },
    getAjax_GetLodgeUnitCalendar : function (lodgeUnitId, startdate, enddate,calendarCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&calendarCode='+calendarCode+'&_t='+new Date().getTime();
    },
    getAjax_CheckCalendarVerifyCodeUrl : function(luId,verifyCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckCalendarVerifyCode?luid='+luId+'&calendarCode='+verifyCode;
    },
    getAjax_SetLodgeUnitDayPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitDayPrice?lodgeunitid='+lodgeUnitId+'&price='+price+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitWeekPriceUrl : function (lodgeUnitId, monValue,tueValue,wedValue,thuValue,friValue,satValue,sunValue,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitWeekPrice?lodgeunitid="+lodgeUnitId+"&mon="+monValue+"&tue="+tueValue+"&wed="+wedValue+"&thu="+thuValue+"&fri="+friValue+"&sat="+satValue+"&sun="+sunValue+"&startdate="+startDate+"&enddate="+endDate+"&_t="+new Date().getTime();
    },
    getAjax_FangDong_WeekMonthPromotionUrl : function (lodgeUnitId, discountPerWeek,discountPerMonth) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_WeekMonthPromotion?lodgeunitid="+lodgeUnitId+"&discountperweek="+discountPerWeek+"&discountpermonth="+discountPerMonth+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitDateIntervalPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitDateIntervalPrice?lodgeunitid="+lodgeUnitId+"&price="+price+"&_t="+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl: function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate + '&enddate='+enddate;
    },
    getAjax_FangDong_EditOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_EditOrderPrice";
    },
    getAjax_Pub_GetStepPreviewUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"_Preview?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_Pub_GetStepEditUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundSubmitUrl : function (bookOrderId, cancelBookOrderType, cancelBookOrderReason) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundSubmit?bookOrderId='+bookOrderId+'&cancelBookOrderType='+cancelBookOrderType+'&cancelBookOrderReason=' + encodeURIComponent(cancelBookOrderReason);
    },
    getAjax_Pub_GetProvinceJson : function (nation_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getProvinceInfoJson?nationid='+nation_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetCityJson : function (province_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCityJson?provinceid='+province_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetDistrictJson : function (city_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDistrictJson?cityid='+city_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLocaltion?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetsJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getStreetJson?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_CheckAlipayInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_Pub_SaveAlipayInfo : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+encodeURIComponent(alipayusername);
    },
    getAjax_Pub_SetAlipayInfo : function (alipayno,alipayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo';
        //return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SetAlipayInfo&alipayno='+alipayno+'&alipayusername='+alipayusername+'&alipaybalanceform='+balanceForm;
    },
    getAjax_Pub_PreBankPayMent_Submit : function (bankname,bankprovice,bankcity,bankaccountid,bankbranchname,pubpri,bankbranchtex,bankaccountname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreBanckPayMent_Submit?bankname='+bankname+'&bankprovice='+bankprovice+'&bankcity='+bankcity+'&bankaccountid='+bankaccountid+'&bankbranchname='+bankbranchname+'&pubpri='+pubpri+'&bankbranchtext='+bankbranchtex+'&bankaccountname='+bankaccountname;
    },
    getAjax_Pub_Set_SelfPromotion : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Set_SelfPromotion?luid='+luid;
    },
    getAjax_Pub_CutImage : function (url,width,height) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CutImage?key='+url+'&_w='+width+'&_h='+height;
    },
    getAjax_Pub_UploadCutAfterIamge : function (key,value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_uploadCutAfterImage?key='+key+'&value='+value;
    },
    getAjax_Pub_PreGetUserHeadImg : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreGetUserHeadImg';
    },
    getPub_Step1_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_HouseDetail_Submit';
    },
    getPub_Step1_RoomBase_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomBase_Submit';
    },
    getPub_Step2_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomDetail_Submit';
    },
    getPub_Step3_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomFacilities_Submit';
    },
    getPub_Step4_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPicture_Submit';
    },
    getPub_Step5_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPrice_SubmitSave';
    },
    getAjax_RoomProcessPass : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomProcessPass?roomId='+roomId;
    },
    getPub_HouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map?roomId='+roomId;
    },
    getPub_PreviewHouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map_Preview?roomId='+roomId;
    },
    getPub_PreviewHouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewHouseRoomDetail?roomId='+roomId;
    },
    getPub_Preview_HouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_HouseRoomDetail?roomId='+roomId;
    },
    getPub_PreviewDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewDetail?roomId='+roomId;
    },
    getPub_Preview_RoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomDetail?roomId='+roomId;
    },
    getPub_PreviewFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewFacilities?roomId='+roomId;
    },
    getPub_Preview_RoomFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomFacilities?roomId='+roomId;
    },
    getPub_PreviewPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPicture?roomId='+roomId;
    },
    getPub_Preview_RoomPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPicture?roomId='+roomId;
    },
    getPub_PreviewPrice : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPrice?roomId='+roomId+'&room_type=2';
    },
    getPub_Preview_Price : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPrice?roomId='+roomId;
    },
    getPub_PreviewPriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPriceQequest?roomId='+roomId+'&room_type=3';
    },
    getPub_Preview_PriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPriceQequest?roomId='+roomId;
    },
    getPub_Preview_Success : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_Success';
    },
    getPub_LodgeUnitSite : function(houseId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite?houseId='+houseId+'&rand='+Math.random();
    },
    getPub_LodgeUnitSite_Save : function(houseId,nationId,provinceId,cityId,districtId,streetId,inputAddress,latlng,doorNumber){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite_Save?houseId='+houseId+'&nationId='+nationId+'&provinceId='+provinceId+'&cityId='+cityId+'&districtId='+districtId+'&streetId='+streetId+'&inputAddress='+inputAddress+'&latlng='+latlng+'&doorNumber='+doorNumber+'&rand='+Math.random();
    },
    getPub_EditAddress : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_EditAddress';
    },
    getPub_CheckAddressUrl : function(provinceId,longitude,latitude){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_CheckAddress?provinceId='+provinceId+'&longitude='+longitude+'&latitude='+latitude+'&rand='+Math.random();
    },
    getFront_Map_GetMapData : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMapData';
    },
    getFront_Map_GetSubway4Map : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSubway4Map';
    },
    getFront_Map_CheckSearchCondition : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition';
    },
    getAjax_Map_GetLandMarkSuggestion : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLandMarkSuggestion';
    },
    getAjax_FangDong_SetAutoCheck : function (isAutoCheck) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAutoCheck?isAutoCheck=' + isAutoCheck;
    },
    getAjax_Front_GetCancelRule : function (luid,roomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetCancelRule?luid='+luid+'&roomNum='+roomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetBookAbleRoomNum : function (lodgeId,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetBookAbleRoomNum?lodgeunitid='+lodgeId+'&startdate='+startDate+'&enddate='+endDate;
    },
    getAjax_Front_GetRoomBookAble : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetRoomBookAble?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&bookorderid='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetTotalPrice4BookOrder : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTotalPrice4BookOrder?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+Math.floor(Math.random()*10000);
    },
    getAjax_Front_PicCheckCodeVerify : function (checkcode,phone) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PicCheckCodeVerify?checkcode='+checkcode+'&phone='+phone;
    },
    getAjax_Front_UpdateLoginUser : function (name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UpdateLoginUser?realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_PhoneIsLoginUser : function (mobile,name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsLoginUser?mobile='+mobile+'&realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_CollegeStudentShare : function (status,image,state,objId,objType,friendName,phone,phonecode,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/SendCollegeStudentShare?status='+status+'&image='+image+'&state='+state+'&objId='+objId+'&objType='+objType+'&friendName='+friendName+"&phone="+phone+"&phonecode="+phonecode+"&email="+email;
    },
    getAjax_Front_PhoneIsNotExist_PhoneIsLoginUser : function (value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+value+'&rand='+new Date().getTime();
    },
    getAjax_Front_GaoXiao_RoomComment : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetComment4GaoXiao?luid='+luid;
    },
    getWeb_FangDong_CommentUrl : function (filter) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Comment&filter='+filter;
    },
    getAjax_Front_UserTenantList : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_UserTenant?rand='+new Date().getTime();
    },
    getWeb_FangKe_CommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment';
    },
    getAjax_UserReal_RenZheng : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UserReal_RenZheng';
    },
    getAjax_FD_DelDiaryUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DelDiary?id='+id;
    },
    getAJAX_FD_RealNameVerifyImgSubUrl : function (data,flag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FD_RealNameVerifyImgSub?data=' + data +"&flag=" + flag;
    },
    getFangDong_CutSpecialHeadImageFrameUrl : function (imageUrl,markdw,markdh) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutSpecialHeadImageFrame&imageUrl=' + imageUrl + '&markdw=' + markdw + '&markdh=' + markdh;
    },
    getAjax_FD_SaveSpecialHeadImage : function (cutx,cuty,cutw,cuth,oriw,orih,oriurl,cutbkgw,cutbkgh,imgIntro) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_SaveSpecialHeadImage?cutx=' + cutx +"&cuty=" + cuty + "&cutw=" + cutw + "&cuth=" + cuth + "&oriw=" + oriw + "&orih=" + orih + "&oriurl=" + oriurl + "&cutbkgw=" + cutbkgw + "&cutbkgh=" + cutbkgh + "&imgIntro=" + encodeURIComponent(imgIntro);
    },
    getAjax_FD_DiaryCountUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DiaryCount';
    },
    getAjax_FD_Special_OfflineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Offline?id=' + id;
    },
    getAjax_FD_Special_OnlineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Online?id=' + id;
    },
    getAjax_FD_RealNameVerifySubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_RealNameVerifySub';
    },
    getAjax_FD_Diary_ToTopUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop?id=' + id;
    },
    getAjax_FD_Diary_ToTop_CountUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop_Count';
    },
    getFDDiaryUploadImgUrl : function () {
        return window.location.protocol+'//'+domain+'/imgin4ImageText.php';
    },
    getAjax_GetTenantTagsUrl: function (tenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantTags?tenantid=' + tenantId;
    },
    getAjax_UpdateSelfIntroUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateSelfIntro';
    },
    getAjax_UpdateCheckInInfoDisplayTypeUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateCheckInInfoDisplayType';
    },
    getAjax_GetTenantSpecialHeadImgsUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantSpecialHeadImgUrl';
    },
    getAjax_SetTenantSpecialHeadImgUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantSpecialHeadImgUrl';
    },
    getAjax_SearchLodgeUnit : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchLodgeUnit';
    },
    getWeb_NeedPub: function (cityDomain, startDate, endDate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub&startDate='+startDate+'&endDate='+endDate+'&searchcity='+cityDomain;
    },
    getWeb_NeedPubSubmit : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub_Submit';
    },
    getAjax_SetTenantNeedResponseStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedResponseStatus';
    },
    getAjax_SetTenantNeedTimeOutStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedTimeOutStatus';
    },
    getAjax_NeedLodgeunit : function () {
        return window.location.protocol+'//'+domain+'//ajaxRequest/Ajax_getNeedLodgeunit';
    },
    getAjax_NeedLandlord : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNeedLandlord';
    },
    getAjax_ValidNeedCount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ValidNeedCount';
    },
    getFront_Login : function (next) {
        return window.location.protocol+'//'+topLevelDomain+'/login?next='+next;
    },
    getAjax_MakeAgeInfo : function (year,month,day) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_MakeAgeInfo?year='+year+'&month='+month+'&day='+day;
    },
    getAjax_CookieNoSubmitUsernameAndEmail : function (username,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CookieNoSubmitUsernameAndEmail?username='+username+'&email='+email;
    },
    getAjax_IncreaseGuideVisits : function (guideType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_IncreaseGuideVisits?type='+guideType+'&random='+ new Date().getTime();
    },
    getAjax_FK_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_OperatorTenantNeedOrder';
    },
    getAjax_FD_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_OperatorTenantNeedOrder';
    },
    getAjax_GetTenantNeedOrderPriceDetailUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantNeedOrderPriceDetail?tenantNeedOrderId=' + id + "&rand="+new Date().getTime();
    },
    getAJAX_TenantNeedOrderPaySynLockCheckUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_TenantNeedOrderPaySynLockCheck';
    },
    getAjax_FD_EditTenantNeedOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FD_EditTenantNeedOrderPrice";
    },
    getAjax_InviteFriendByEmailUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_InviteFriendByEmail';
    },
    getAjax_UpdateInviteCodeUrl : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_UpdateInviteCode';
    },
    getAjax_InviteListUrl : function (offset) {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteList?offset=' + offset + '&length=10';
    },
    getAjax_InviteInfo : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteInfo';
    },
    getAjax_GetReferrerLandlordsUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetReferrerLandlords';
    },
    getAjax_doSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSettle';
    },
    getAjax_SetBankPaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetBankPaymentSub';
    },
    getAjax_setAlipaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_setAlipaymentSub';
    },
    getAjax_TenantDoSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_TenantDoSettle';
    },
    getAjax_LandlordDirectsellSettleRecordDataUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLandlordDirectsellSettleRecordData';
    },
    getAjax_ShareAfter : function (objId,objType,shareContentType,channel) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShareAfter?objid='+objId+'&objtype='+objType+'&sharecontenttype='+shareContentType+'&channel='+channel;
    },
    getAjax_Exam : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_do_FangDong_Examination';
    },
    getAjax_Add_Cui : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_Special_Add_Urge';
    },
    getAjax_FangkeInBlackList : function (mobile,cardNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangkeInBlackList?mobile='+mobile+'&cardNo='+cardNo;
    },
    getAjax_BookOrder_EditUserInfo : function (password,nickname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrder_EditUserInfo?password='+password+'&nickname='+nickname;
    },
    getAjax_jsErrorLogger : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_JsErrorLogger';
    },
    getAjax_BookOrder_CheckState : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_BookOrder_CheckState?luid="+lodgeId+"&roomnum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+'&bookOrderId='+bookOrderId+'&version='+version+"&rand="+new Date().getTime();
    },
    getAjax_1yuanAutumnStatus : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/autumnDeep1yuanInStatus?time="+new Date().getTime();
    },
    getAjax_Add_Zan : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Add_Zan';
    },
    getAjax_sendCoupon4AprilFoolDay : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_sendCoupon4AprilFoolDay';
    },
    getAjax_BookPayIntegralCoupon : function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayIntegralCoupon?bookorderid='+bookorderid;
    },
    getAjax_CouponInfo: function (couponid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetCouponInfo?couponid='+couponid;
    },
    getAjax_BookPayAbleCoupon: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayAbleCoupon?bookorderid='+bookorderid;
    },
    //dpv2 feiqi
    getWeb_FangKe_CheckCommentUrl: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommitCheck?bookorderid='+bookorderid;
    },
    getAddBillSubUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBillSub';
    },
    getUserBillHistoryUrl : function(pageNum){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillHis?p='+pageNum+'&rand='+Math.random();
    },
    getCancelBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillCancel?id='+id;
    },
    getAddBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBill?invoiceId='+id+'&rand='+Math.random();
    },
    getBillUrl : function(state,id){
        var url = '';
        if(state){
            url = '&state='+state;
        }
        if(id){
            url = '&invoiceId='+id;
        }
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FK_AddBill'+url;
    },
    getAjax_drawLottery4NoonBreakUrl : function (district,address){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DrawLottery4NoonBreak?district='+district+'&address='+address+'&rand='+Math.random();
    },
    getAjax_getNoonBreakAwardUrl : function (name,mobile,sleepTime){
        if(name && mobile && sleepTime){
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?name='+encodeURI(name)+'&mobile='+mobile+'&sleepTime='+sleepTime+'&rand='+Math.random();
        } else {
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?rand='+Math.random();
        }
    },
    getAjax_getAvaliableCarBedUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAvaliableCarBed?rand='+Math.random();
    },
    getAjax_LuckerList4NoonBreakUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_LuckerList4NoonBreak?rand='+Math.random();
    },
    getAjaxAddFavorite: function (loginUserid,lodgeUnitId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavorite?loginUserid='+loginUserid+'&lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxEditFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_EditFavoriteGroup';
    },
    getAjaxAddFavoritePage: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAddFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteNew: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavoriteNew';
    },
    getAjaxCancelFavorite: function (lodgeUnitId,groupId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelFavorite?lodgeUnitId='+lodgeUnitId+'&groupId='+groupId+'&rand='+new Date().getTime();
    },
    getAjaxCancelAllFavorite: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelAllFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_addFavoriteGroup';
    },
    getAjaxDelFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delFavoriteGroup';
    },
    getAjaxGetZhiMaNoCashPledgeList: function (cityId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getZhiMaNoCashPledgeList?cityId='+cityId+'&rand='+new Date().getTime();
    },
    getAjaxApplyCashPledgeByLandlordUrl : function(bookOrderId,pledge2Landlord,reason){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyCashPledge';
    },
    getAjaxCancelCashPledgeByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_CancelCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjaxApplyServiceByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyService4CashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getReturnCashPledgeUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ReturnCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAJAX_GetLodgeUnitCalendar : function (luid,startDate,endDate,editable,calendarCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLodgeUnitCalendar?lodgeunitid='+luid+'&startdate='+startDate+'&enddate='+endDate+'&editable='+editable+'&calendarCode='+calendarCode+'&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamen : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_luckyDraw&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamenShare : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_shareLuckyDraw&rand='+Math.random();
    },
    getAJAX_applyCleanService : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_applyCleanService';
    },
    getAJAX_getMsCoupon : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getMsCoupon';
    },
    getAJAXA_getServiceTimeByDate : function(date){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_getServiceTimeByDate&date='+date+'&rand='+new Date().getTime();
    },
    getAjax_submitCleanServiceOrder : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_submitCleanServiceOrder';
    },
    getCleanServiceOrderDetailUrl : function(orderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetail&orderId='+orderId;
    },
    getAjax_cleanServiceOrderPaySubmit : function(orderId,bank) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderPaySubmit&orderId='+orderId+'&bank='+bank;
    },
    getAjax_cancelCleanServiceOrder : function(orderId,cancelType,returnMoney,punishMoney){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderCancelSubmit&orderId='+orderId+'&returnMoney='+returnMoney+'&punishMoney='+punishMoney+'&cancelType='+cancelType+'&rand='+new Date().getTime();
    },
    getFangDong_MyRoomsUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_MyRooms';
    },
    getAjax_sendCouponUrl: function (mobile,verifycode,state) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_sendCoupon?mobile="+mobile + "&verifycode=" + verifycode + "&state=" +state;
    },
    getBookOrderSubmitUrl: function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_AddBookorderSubmit';
    },
    getAjax_nationCodeHtml: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetNationCodeHtml";
    },
    getAjax_nationCardHtml: function () {
        return window.location.protocol+"//"+domain+"/xzweb.php?op=GetNationCardHtml";
    },
    getAjax_CheckTenantMobile: function (tenantId,mobile,mobileNation) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckTenantMobile?tenantId="+tenantId+"&tenantMobile="+mobile+"&mobileNation="+mobileNation;
    },
    getAjax_checkEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateRegEmail";
    },
    getAjax_checkFindPwdEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateFindPwdEmail";
    },
    getAjax_checkActiveEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateActiveEmail";
    },
    get_SetUserInfoSubUrl : function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=SetUserInfoSubByType';
    },
    getWeb_GetProvinceUrl : function (nationId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelProvinceJson&nationid=' + nationId ;
    },
    getAjax_GetShareInfo : function (objId,objType,shareContentType,cityId,shareInvite,hideWechat) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetShareInfo?objId='+objId+'&objType='+objType+'&shareContentType='+shareContentType+'&cityId='+cityId+'&shareInvite='+shareInvite+'&hideWechat='+hideWechat;
    },
    getAjax_GetCityLightsV3Url : function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DoCityLightsV3';
    },
    getAjax_GetFirstOrderReducePermission : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetFirstOrderReducePermission';
    },
    getAjax_ChannelStatistics : function (objid, opertype, channels, statisticsSign) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_StatisticsSubmit?objid='+objid+'&opertype='+opertype+'&channels='+channels+'&statisticsSign='+statisticsSign;
    },
    getAjax_UnSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UnSignFirstCheckIn';
    },
    getAjax_doSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSignFirstCheckIn';
    },
    getAjax_GetQualificationConfigList: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationConfigList?luId='+luId;
    },
    getAjax_GetQualificationInfo: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationInfo?luId='+luId;
    },
    getAjax_Qualification_Submit: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_Submit';
    },
    getAjax_QualificationMaterial: function(materialConfigId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_QualificationAvailableMaterial?materialConfigId='+materialConfigId;
    },
    getQualicationInfo : function(luId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_QualificationInfo&lodgeUnitId='+luId;
    },
    getFangKeUserInfo : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserInfo';
    },
    getFdOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderDetail&bookOrderId='+bookOrderId;
    },
    getFkOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_OrderDetail&bookOrderId='+bookOrderId;
    },
    getAjax_doFullTextSearchUrl: function(offset, url){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch?offset='+offset+'&url='+url;
    },
    getAjax_CheckIDCardIfAuth : function(idcard){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIDCardIfAuth?idcard='+idcard;
    },
    getAjax_SendSensitiveOPCode: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendSensitiveOPCode';
    },
    getAjax_SensitiveOPCodeVerify: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SensitiveOPCodeVerify';
    },
    getAjax_PartnerSetNewsletter : function (partnerChannel,canSend) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PartnerSetNewsletter?partnerChannel='+encodeURIComponent(partnerChannel)+'&canSend='+encodeURIComponent(canSend);
    },
    getAjax_updateOrderCashPledge : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateOrderCashPledge?bookOrderId='+bookOrderId;
    },
    getAjax_CheckPartnerOrderPrice : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPartnerOrderPrice';
    },
    getAjax_GetSameRooms : function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSameRooms?luid='+luId;
    },
    getAjax_GetCommentDiary4Index : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCommentDiary4Index';
    },
    getAjax_GetDetailComment : function (lodgeId,cityDomain,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDetailComment?lodgeId='+lodgeId+"&cityDomain="+cityDomain+"&p="+pageNo;
    },
    getAjax_GetOtherDetailComment : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetOtherDetailComment?lodgeId='+lodgeId+'&p='+pageNo;
    },
    getAjax_FlashBook_LandlordSetting : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_LandlordSetting';
    },
    getAjax_FlashBook_UpdateLandlordSetting:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_UpdateLandlordSetting';
    },
    getAjax_GetLawPopupPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLawPopupPage';
    },
    getAjax_GetAgreementPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetAgreementPage';
    },
    getAjax_DoAgree_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoAgree';
    },
    getAJAX_GetTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetTerminalUniqueIdentification';
    },
    getAJAX_SetTmpTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SetTmpTerminalUniqueIdentification';
    },
    getAJAX_SetBaiTuanGetRoomInfo_Url:function(type, module, page, pagesize, random) {
    	random = typeof random !== 'undefined' ?  random : 1;
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMainActivity?type='+type+'&module='+module+"&page="+page+"&pagesize="+pagesize+"&random="+random;
    },
    getAJAX_ChangeLodgeUnitRepositoryBookFlow:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeLodgeUnitRepositoryBookFlow';
    },
    getAJAX_SetBaiTuanSendCoupond_Url:function(type,tag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanCoupondSend?type='+type+"&tag="+tag;
    },
    getAJAX_SetMeisuView_Url:function(luid, module) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMeisuView?luid='+luid+"&module="+module;
    },
    getAjax_CancelAuthForYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CancelAuthForYunzhanggui';
    },
    getAjax_IsAuthToYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_IsAuthToYunzhanggui';
    },
    // 百团领券
    getAjax_baituanCoupon: function(couponActivityId,userid){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoSendCouponByUser?couponActivityId='+couponActivityId+'&loginUser='+userid;
    },
    getAJAX_HomeStayActivity_Url:function(params) {
    	    var str = '';
    	    for(key in params){
            str += key+"="+params[key]+"&";
        }
        var url = window.location.protocol+'//'+domain+'/ajaxRequest?'+str;
        return url;
    },
    //百团活动页
    getWeb_baituanActivityUrl:function(){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_HomeStayMain';
    },
    //图片uploadUrl
    getUpload_Url : function(params)
    {
        if(params === undefined){
            params = '';
        }
        var url = uploadImageUrl + params;
        if(uploadImageUrl.indexOf("http") != -1)
        {
            if(window.location.protocol == "https"){
                url = "https" + uploadImageUrl.substring(5) + params;
            }
        }else{
            url = window.location.protocol + '//' + uploadImageUrl + params;
        }
        return url;
    },
    
    config:{
        env: function(){
            var hostName = window.location.host;
            var envParams =['Dev','Test','Prerelease','Pro'];
            var switchPro = true,envListIndex ;
            for(var i = 0;i<envParams.length;i++){
               var reg = new RegExp(envParams[i].toLowerCase());
               if(reg.test(hostName)){
                   switchPro = false;
                   envListIndex = i;
               }
            }
            if(switchPro){
                return 'Pro';
            }else{
                return envParams[envListIndex];
            }
        },
        xzfk: '/app/xzfk/web/500/',
        // 开发环境
        mainDomainDev: 'https://wirelesspub-global.dev.xiaozhu.com',
        // 测试环境
        mainDomainTest: 'https://test-wirelesspub-xzcommon-00.xiaozhu.com',
        // 预上线环境
        mainDomainPrerelease: 'https://prerelease-wirelesspub-global.xiaozhu.com',
        // 正式环境
        mainDomainPro: 'https://wirelesspub-global.xiaozhu.com'
    },
    // 获取安全验证方式
    getSlideVerifyType:function(){
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyType';
    },
    getSlideVerifyRes:function () {
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyRes';
    },
    getProductTypeList:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetProductTypeList';
    },
    getSearchCitysLists:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCitys';
    },
    getCancelRule: function(luid){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysCancelRule&luId='+ luid;
    },
    updateCancelRule: function(luid, type, limitCancelOrder){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysUpdateLodgeUnit&luId='+ luid + '&type=' + type + '&limitCancelOrder=' + limitCancelOrder;
    },
    getIndexCancelRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRule&luId='+ luid;
    },
    getSelectRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_CancelRuleLodgeUnitCenter&luId='+ luid;
    },
    getCancelRuleDate: function (luid, checkInDay, checkOutDay) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRuleWithDate&luId='+ luid + '&checkInDay=' + checkInDay + '&checkOutDay=' + checkOutDay;
    },
    getCityInfo:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCityInfo';
    }
};
 
 var xzRegularExpression={a:1,isNum:/^\d{1,}$/,isMobile:/^\d{11}$/,isMobileWithSplit:/^[\d-]{10,}$/,isUsername:/^[\w|\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]*$/,isChinese:/^[\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]+$/,simpleMobile:/^\d{11}$/,mobile:/^1((2[7])|(3[0-9])|(4[5-9])|(5[0-9])|(6[124567])|(7[0-8])|(8[0-9])|(9[0-9]))\d{8}$/,password:/^[0-9a-zA-Z*!@.\-? : ;|$#%^&()_+=\[\]\\\/{}<>",~`']{0,}$/,numbers:/[1-9][0-9]{4}/,simpleEmail:/^.*?@.+$/,email:/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+[a-zA-Z]+$/,passport:/^[\d\w]{4,20}$/,inviteCode:/^[A-Z0-9]{7,15}$/,simpleDate:/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,simpleDateTime:/^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9](:[0-5][0-9]){1,2}$/}; 
 window.captchaModel = {
    toast: function (msg, type) {
        if (!msg) return false;
        if (!$('body').find('.xz_toast_private').length) {
            var div = '<div class="xz_toast_private"><span class="toast_txt">' + msg + '</span></div>';
            $('body').append(div);
            $('.xz_toast_private').css({
                "position": "fixed",
                "z-index": '10002',
                "min-width": "380px",
                "padding": "15px 15px 15px 20px",
                "line-height": "24px",
                "text-align": "center",
                "background": "#D4EDEB",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "left": "50%",
                "transform": "translateX(-50%)",
                "top": "20px",
                "box-sizing": "border-box",
                "border": "1px solid #26A69A",
                "border-color": "#D4EDEB"
            });
            $('.xz_toast_private .toast_txt').css({
                "background-image": "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)",
                "background-position": 'left center',
                "background-repeat": 'no-repeat',
                "padding": "10px 0 10px 30px"
            });
        } else {
            $('.xz_toast_private .toast_txt').html(msg);
        }
        $('.xz_toast_private').css({
            "background": type === "error" ? "#FFEBF2" : "#D4EDEB",
            "color": type === "error" ? "#ff4081" : "#26A69A",
            "border-color": type === "error" ? "#FFEBF2" : "#D4EDEB"
        });
        $('.xz_toast_private .toast_txt').css({
            "background-image": type === "error" ? "url('icon-error.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-error.png*/)" : "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)"
        });
        $('.xz_toast_private').show();
        var timer = setTimeout(function () {
            $('.xz_toast_private').hide();
            $('.xz_toast_private .toast_txt').html('');
            window.clearInterval(timer);
            timer = null;
        }, 3 * 1000);
    },
    showModel: function (node) {
        if (!$('body').find('.xz_model_private').length) {
            var div = '<div class="xz_model_private"><div class="panel"><div class="slide"><div class="tips">请您完成以下验证，验证成功后可继续探索小猪。</div><div class="node">' + node + '</div></div></div></div>';

            $('body').append(div);
            $('.xz_model_private').css({
                "position": "fixed",
                "z-index": '10001',
                "background": "rgba(0, 0, 0, .6)",
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "display": "none"
            });
            $('.xz_model_private  .panel').css({
                "position": "fixed",
                "top": "50%",
                "left": "50%",
                "z-index": '1002',
                "width": "300px",
                "min-height": "150px",
                "padding": "25px 25px 25px 25px",
                "text-align": "center",
                "background": "#fff",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "display": "flex",
                "display": "-webkit-flex",
                "justify-content": "center",
                "-webkit-justify-content": "center",
                "align-items": "center",
                "-webkit-align-items": "center",
                "transform": "translate(-50%, -50%)",
            });
            $('.xz_model_private .tips').css({
                "margin-bottom": "20px",
                "width": "100%",
                "color": "#212121",
                "font-size": "16px",
                "text-align": "left"
            });
        } else {
            $('.xz_model_private .node').empty().append(node);
        }
        $('.xz_model_private').css('display', 'block');
    },
    hideModel: function () {
        $('.xz_model_private').css('display', 'none');
    }
};
 
 /*
*
*
* init: 操作滑动模块dom函数
* onSuccess: 验证成功的回调函数
* onLoad: 初始化成功函数
* onError: 初始化错误函数
*
*
*
* 返回实例参数：
*
*
* 验证类型 默认网易
* slideVerifyType
*
* 网易验证通过token
* NECaptchaValidate
*
*
* 阿里验证通过token
* slideVerifyToken
* slideVerifyScene
* slideVerifySessionId
* slideVerifySig
*
* 验证通过标志
* safeChecked
*
*
*
* */
var cookieApi = {
    setCookie: function (name, value, day) {
        var domain = 'http://jci.xiaozhustatic1.com/e19061101/;path=/;domain=xiaozhu.com';
        if (day !== 0) {
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + domain;
        } else {
            document.cookie = name + "=" + escape(value) + domain;
        }
    },
    getCookie: function (name){
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg) ){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    }
};

var calendarToken = cookieApi.getCookie('SPIDER_AVOID_TOKEN_calendar');
if (calendarToken) {
  localStorage.setItem('SPIDER_AVOID_TOKEN_calendar', calendarToken);
}
function Captcha(config) {
    var that = this;

    // 获取滑动验证类型接口
    var URL_GET_SLIDE_VERIFY_TYPE = XZWebUrlWriter.getSlideVerifyType();
    // 滑动验证码验证接口
    var URL_GET_SLIDE_VERIFY_RES = XZWebUrlWriter.getSlideVerifyRes();

    var fetch = function (type, url, cb) {
        // 获取滑动验证类型
        if (type === 'res') {
            url = url +
                '?NECaptchaValidate=' + that.NECaptchaValidate +
                '&slideVerifyType=' + that.slideVerifyType +
                '&slideVerifyToken=' + that.slideVerifyToken +
                '&slideVerifySessionId=' + that.slideVerifySessionId +
                '&slideVerifySig=' + that.slideVerifySig +
                '&slideVerifyScene=' + that.slideVerifyScene +
                '&busiKey=' + config.busiKey;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    };

    // 验证类型 默认网易云
    that.slideVerifyType = 'yidun';

    // 网易验证通过token
    that.NECaptchaValidate = '';

    // 阿里验证通过token
    that.slideVerifyToken = '';
    that.slideVerifyScene = '';
    that.slideVerifySessionId = '';
    that.slideVerifySig = '';

    // 验证通过
    that.safeChecked = false;
    if (config.busiKey) {
        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
    }

    var uniqueId = Math.random().toString(36).substr(2);
    var initSafeCheck = function () {
        $('#captcha').remove();
        var head= document.getElementsByTagName('head')[0];
        var first= head.firstChild;
        var spidersafeScript = document.createElement("script");
        spidersafeScript.setAttribute('id', 'captcha');
        spidersafeScript.type = "text/javascript";
        spidersafeScript.src = that.slideVerifyType === 'yidun' ? "https://cstaticdun.126.net/load.min.js" : "https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012";
        head.insertBefore(spidersafeScript, first);
        spidersafeScript.onload = function () {
            var slideContainer = '<div style="margin-bottom: 10px;width: 100%;" id="'+ that.slideVerifyType + uniqueId + '" class="nc-container"></div>';
            config.init(slideContainer);
            if (that.slideVerifyType === 'yidun') {
                /*
                *
                * 网易验证
                *
                * */
                initNECaptcha({
                    // 网易key
                    captchaId: '8c35527a6e7f4dcbba3768634a3bc61f',
                    // 网易验证码容器
                    element: '#' + that.slideVerifyType + uniqueId,
                    mode: config.mode || 'embed',
                    width: config.width || 300,
                    // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    onReady: function (instance) {

                    },
                    // 验证成功
                    onVerify: function (err, data) {
                        try {
                            that.NECaptchaValidate = data.validate || '';
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                    }
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }

                    }
                }, function onload(instance) {
                    // 初始化成功
                    if (config.onLoad) {
                        config.onLoad();
                    }
                }, function onerror(err) {
                    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                    if (config.onError) {
                        config.onError();
                    }
                })
            } else if (that.slideVerifyType === 'aliyun') {
                /*
                *
                * 阿里验证
                *
                * */
                var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
                var NC_Opt = {
                    renderTo: '#' + that.slideVerifyType + uniqueId,
                    appkey: 'FFFF0N0000000000703C',
                    scene: 'nc_register',
                    token: nc_token,
                    customWidth: config.width || 300,
                    trans: {
                        'key1': 'code0'
                    },
                    elementID: ['usernameID'],
                    is_Opt: 0,
                    language: 'cn',
                    isEnabled: true,
                    timeout: 3000,
                    times: 5,
                    apimap: {
                        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                        // 'get_captcha': '//b.com/get_captcha/ver3',
                        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                        // 'get_img': '//c.com/get_img',
                        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                        // 'umid_Url': 'um.js'/*tpa=http://e.com/security/umscript/3.2.1/um.js*/,
                        // 'uab_Url': '909.js'/*tpa=http://aeu.alicdn.com/js/uac/909.js*/,
                        // 'umid_serUrl': 'https://g.com/service/um.json'
                    },
                    callback: function (data) {
                        try {
                            that.slideVerifyToken = nc_token;
                            that.slideVerifySessionId = data.csessionid;
                            that.slideVerifySig = data.sig;
                            that.slideVerifyScene = NC_Opt.scene;
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                    }
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }
                    },
                    error: function () {
                        if (config.onError) {
                            config.onError();
                        }
                    }
                };
                var nc = new noCaptcha(NC_Opt);
                nc.upLang('cn', {
                    _startTEXT: '请按住滑块，拖动到最右边',
                    _yesTEXT: '验证通过',
                    _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
                    _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
                })
            }
        }
    };

    var getSlideVerifyTypeCb = function (res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (data.status === 200) {
            that.slideVerifyType = data.content || 'yidun';
            initSafeCheck();
        }
    };

    fetch('type', URL_GET_SLIDE_VERIFY_TYPE, getSlideVerifyTypeCb);
}
 
 function captchaInterceptors (busiKey, isReload, res, captchaAction, successAction,status) {
    if (typeof res === 'string' && (res.indexOf('status') !== -1)) {
        res = JSON.parse(res);
    }
    if(status && status ==307){
       if (isReload) {
          var curLocation = window.location.href;
          var host = (window.location.host.indexOf('www') === 0) ? 'http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com' : window.location.host;
          window.location.href =  window.location.protocol + '//' +
             host + '/xz_web2/verify/index.html?slideRedirect=' +
             encodeURIComponent(curLocation);
       } else {
          var onSuccess = function () {
             window.captchaModel.hideModel();
             captchaAction();
          };
          if (busiKey === 'calendar') {
             $('#calendar-box').hide();
          }
          var captcha = new Captcha({
             init: window.captchaModel.showModel,
             onSuccess: onSuccess,
             busiKey: busiKey
          });
       }
       return;
    }
    if (typeof res === 'object' && res !== null && 'status' in res) {
        if (res.status === 6000 || res.status === 60001) {
            if (isReload) {
               var curLocation = window.location.href;
               var host = (window.location.host.indexOf('www') === 0) ? 'http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com' : window.location.host;
               window.location.href =  window.location.protocol + '//' +
                   host + '/xz_web2/verify/index.html?slideRedirect=' +
                   encodeURIComponent(curLocation);
            } else {
                var onSuccess = function () {
                    window.captchaModel.hideModel();
                    captchaAction();
                };
                if (busiKey === 'calendar') {
                   $('#calendar-box').hide();
                }
                var captcha = new Captcha({
                    init: window.captchaModel.showModel,
                    onSuccess: onSuccess,
                    busiKey: busiKey
                });
            }
        } else {
            successAction();
        }
    } else {
        successAction();
    }

}
 
 /*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='http://jci.xiaozhustatic1.com/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
 
 
function checkuser(e){
    if (e.indexOf("@",0)==-1){
        return  checkmobile(e);
    }
    else{
        return checkemail(e);
    }
}
function checkUsernameMobilEmail(e)
{
    if(xzRegularExpression.isMobile.test(e)){
        return  checkmobile(e);
    }
    else if (e.indexOf("@") >=0){
        return checkemail(e);
    }
    else {
        return checkOldUserName(e);
    }
}
function checkmobile(mobile){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var mobileArr = mobile.split('_');
    var regionCode = mobileArr[0];//CN
    var countryCode = mobileArr[1];//86
    var realMobile = mobileArr[2];//13688889999
    if (realMobile == ""){
        returnContent.msg = "请输入手机号";
        returnContent.rst = false;
        return returnContent;
    }
    if(!checkGlobalMobile(mobile))
    {
        returnContent.msg = "手机号码格式错误";
        returnContent.rst = false;
    }
    return returnContent;
}
//bycl
function checkGlobalMobile(mobile){
    var mobileArr = mobile.split('_');
    var regionCode = mobileArr[0];//CN
    var countryCode = mobileArr[1];//86
    var realMobile = mobileArr[2];//13688889999

    if(!(/^\d+$/.test(realMobile))) return false;
    if(countryCode == "86"){
        if(!xzRegularExpression.mobile.test(realMobile)){
            return false;
        }
        return true;
    }

    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var phoneNumber = realMobile;
    var carrierCode = countryCode;
    
    //检测区号是否正确
    var hasThiscountryCode = phoneUtil.hasValidCountryCallingCode_(carrierCode);
    if(!hasThiscountryCode){
        return false;
    }
    var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
    var isPossible = phoneUtil.isPossibleNumber(number);
    if (!isPossible) {
       // output.append('\nResult from isPossibleNumberWithReason(): ');
        var PNV = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
        switch (phoneUtil.isPossibleNumberWithReason(number)) {
            case PNV.INVALID_COUNTRY_CODE:
                break;
            case PNV.TOO_SHORT:
                break;
            case PNV.TOO_LONG:
                break;
        }

        return false;
    } else {
        var result = false;
        var isNumberValid = phoneUtil.isValidNumber(number);
        if (isNumberValid && regionCode && regionCode != 'ZZ') {
           result = phoneUtil.isValidNumberForRegion(number, regionCode);
            if(result === undefined){  
                result=false;
            }
        }
        /*
        output.append(phoneUtil.getRegionCodeForNumber(number));
        */
    return result;
    }
}

function checkverifyCode(verifyCode){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (verifyCode == "") {
        returnContent.msg = "请输入图片验证码";
        returnContent.rst = false;
        return returnContent;
    }
    if(verifyCode.length != 4)
    {
        returnContent.msg = "图片验证码错误";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkactivateCode(activateCode){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true; 
    if (activateCode == "") {
        returnContent.msg = "请输入手机验证码";
        returnContent.rst = false;
        return returnContent;
    }
    if(activateCode.length != 4){
        returnContent.msg = "手机验证码错误";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}

function CharMode(iN){
    if (iN >= 48 && iN <= 57) 
        return 1;
    if (iN >= 65 && iN <= 90) 
        return 2;
    if (iN >= 97 && iN <= 122) 
        return 4;
    else
        return 8;  
}

function bitTotal(num){
    modes = 0;
    for (i = 0; i < 5; i++){
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

function checkStrong(sPW){
    if (sPW.length <= 5)
        return 0;
    Modes = 0;
    for (i = 1; i < sPW.length; i++) {
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

function subCheckPassword(pwd){
    var repeat = true;
    var series = true;
    var series2 = true;
    var len = pwd.length;
    var first = pwd.charAt(0);
    for(var i=1;i<len;i++){
        repeat = repeat && pwd.charAt(i) == first;
        series = series && pwd.charCodeAt(i) == pwd.charCodeAt(i-1) + 1;
        series2 = series2 && pwd.charCodeAt(i) == pwd.charCodeAt(i-1) - 1;
    }
    return !(repeat || series || series2);
}
function checkpassword(password,passEmptyMsg){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.blurmsg = '';
    if(passEmptyMsg=="" || typeof(passEmptyMsg)=="undefined") 
        passEmptyMsg = '请输入密码';
    if(password.length > 8 && checkStrong(password)>1){
        returnContent.level = 3;
    }
    else if(password.length > 8 && checkStrong(password)==1){
        returnContent.level = 2;
    }
    else if(checkStrong(password)>2){
        returnContent.level = 3;
    }
    else
    {
        returnContent.level = checkStrong(password);
    }
    returnContent.rst = true;
    if (password == ""){
        returnContent.msg = passEmptyMsg;
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.password.test(password)){
        returnContent.msg = "包含非法字符，请重新输入";
        returnContent.rst = false;
        return returnContent;
    }
    if(password.length < 6 || password.length > 12) {
        returnContent.msg = "密码长度只能在6-12位之间";
        returnContent.rst = false;
        return returnContent;
    }
    if(subCheckPassword(password) == false){
       returnContent.msg = "您的密码过于简单";
       returnContent.rst = false;
     return returnContent;
     }
    return returnContent;
}

function checkpassword2(password){
    var returnContent = {};
    returnContent.msg = '';
    if(password.length > 8 && checkStrong(password) > 1){
        returnContent.level = 3;
    }
    else if(password.length > 8 && checkStrong(password) == 1){
         returnContent.level = 2;
    }
    else if(checkStrong(password) > 2){
        returnContent.level = 3;
    }
    else
    {
        returnContent.level = checkStrong(password);
    }
    returnContent.rst = true;
    if(subCheckPassword(password) == false && password.length > 5){
        returnContent.msg = "您的密码过于简单";
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.password.test(password)){
        returnContent.msg = "包含非法字符，请重新输入";                                                                                                                                                          
        returnContent.rst = false;                                                                                                                                                                                                     
        return returnContent;  
    }
    return returnContent;
}
function checkusername(username){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (username == "") {
        returnContent.msg = "请输入用户名";
        returnContent.rst = false;
        return returnContent;
    }
    var len=0;
    var usernamelen=username.split("");
    for(var i=0;i<username.length;i++)
    {
        if(usernamelen[i].charCodeAt(0)<299){len++ }
        else len+=2;
    }
    if (len < 4){
        returnContent.msg = "用户名太短了";
        returnContent.rst = false;
        return returnContent;
    }
    if (len > 16){
        returnContent.msg = "用户名太长了";
        returnContent.rst = false;
        return returnContent;
    }
    if (!xzRegularExpression.isUsername.test(username)){
        returnContent.msg = "仅可用汉字、字母、数字或下划线";
        returnContent.rst = false;
        return returnContent;
    }
    if ((xzRegularExpression.isMobile.test(username)||xzRegularExpression.simpleEmail.test(username)||xzRegularExpression.numbers.test(username)) && (username.length >4)){
        returnContent.msg = "请勿出现QQ、手机等个人联系方式";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkusername2(username){
    var returnContent = {};
        returnContent.msg = '';
        returnContent.rst = true;
    if ((xzRegularExpression.isMobile.test(username)||xzRegularExpression.simpleEmail.test(username)||xzRegularExpression.numbers.test(username)) && (username.length >4)){
        returnContent.msg = "请勿出现手机、QQ、邮箱等个人联系方式";
        returnContent.rst = false;
        return returnContent;
    }
    if (!xzRegularExpression.isUsername.test(username)){
        returnContent.msg = "仅可使用汉字、英文、数字、下划线";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkemail(email){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (email == ""){
        returnContent.msg = "请输入邮箱";
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.email.test(email)){
        returnContent.msg = "邮箱格式不正确";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkOldUserName(oldUserName)
{
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (!xzRegularExpression.isUsername.test(oldUserName)){
        returnContent.msg = "请输入手机号或邮箱";
        returnContent.rst = false;
    }
    return returnContent;
}
function checkPassport(passId)
{
    var rst = {};
    rst.msg = '';
    rst.rst = true;
    if (passId == '') {
        rst.msg = "请输入护照号码";
        rst.rst = false;
    } else if (!xzRegularExpression.passport.test(passId)){
        rst.msg = "护照号码格式不正确 ";
        rst.rst = false;
    }
    return rst;
}

function checkIdCardRule(cardNo)
{
    var len = cardNo.length;
    if(len != 15 && len !=18)
    {
        return false;
    }
    var reg;
    var cardNoSplit;
    var bGoodDay;   
    var birth;
    if(len == 15)
    {
        if(!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNo)))
        {
            return false;
        }
        else 
        {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);   
            cardNoSplit = cardNo.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);   
            bGoodDay = (birth.getYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));   
        }
    }
    else if(len == 18)
    {
        if(!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNo)))
        {
            return false;
        }
        else 
        {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);   
            bGoodDay = (birth.getFullYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));   

        }
    }
    if (!bGoodDay) 
    { 
        return false;
    }
    else 
    {
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();
        var nowDate = new Date().getDate();

        if( compareBirthDate(birth.getFullYear()+'-'+birth.getMonth()+'-'+birth.getDate(), ((nowYear-102)+"-"+nowMonth+"-"+nowDate))<0 || compareBirthDate(birth.getFullYear()+'-'+birth.getMonth()+'-'+birth.getDate(), ((nowYear-2)+"-"+nowMonth+"-"+nowYear))>0)
        {
            return false;
        }
        else 
        {
            if(len == 15)
            {
                return true;
            }
            else{
            // check city
            var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            if(aCity[parseInt(cardNo.substr(0,2))]==null) {
                return false;
            }
            var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子  
            var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
            var sum = 0, idx;  
            for(var i = 0; i < cardNo.length - 1; i++){  
                sum += parseInt(cardNo.substr(i, 1), 10) * arrExp[i];  
            }  
            idx = sum % 11;  
            // 检验第18为是否与校验码相等  
            return arrValid[idx] == cardNo.substr(17, 1).toUpperCase();  
            }
        }
    }
}
function compareBirthDate(date1,date2)
{ // For ID Card Verify
    var newDate1 = date1.split('-');
    var dateY1 = newDate1[0];
    var dateM1 = newDate1[1];
    var dateD1 = newDate1[2];

    var newDate2 = date2.split('-');
    var dateY2 = newDate2[0];
    var dateM2 = newDate2[1];
    var dateD2 = newDate2[2];

    if(dateY1<dateY2)
    {
        return -1;
    }
    else if(dateY1>dateY2)
    {
        return 1;
    }
    else if(dateY1 == dateY2)
    {
        if(dateM1<dateM2)
        {
            return -1;
        }
        else if(dateM1>dateM2)
        {
            return 1;
        }
        else if(dateM1 == dateM2)
        {
            if(dateD1<dateD2)
            {
                return -1;
            }
            else if(dateD1>dateD2)
            {
                return 1;
            }
            else if(dateD1 == dateD2)
            {
                return 0;
            }
        }
    }
}

 
 
XZWebAjax = {
    get : function(url, ajaxData, async, callback, dataType) {
        var that = this;
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        $.ajax({
            type     : "GET",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                returnData = datas;
                if(callback) callback(datas);
            },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                LogErrors(url, ajaxData, textStatus, XMLHttpRequest.readyState, XMLHttpRequest.responseText);
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getSpider : function(busiKey, isReload, url, ajaxData, async, callback, dataType) {
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                captchaInterceptors(busiKey, isReload, datas, function () {
                    that.getSpider(busiKey, isReload, url, ajaxData, async, callback, dataType);
                }, function () {
                    returnData = datas;if(callback) callback(datas);
                });
            },
           error : function (XMLHttpRequest, textStatus, errorThrown){
              that.revoltReptile(XMLHttpRequest);
           }
        });
        return returnData;
    },
    post : function(url, ajaxData, async, callback, dataType) {
        var that =this;
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;if(callback) callback(datas);},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                LogErrors(url, ajaxData, textStatus, XMLHttpRequest.readyState, XMLHttpRequest.responseText);
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postSpider : function(busiKey, isReload, url, ajaxData, async, callback, dataType) {
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var that = this;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;

        }
        $.ajax({
            type     : "POST",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                captchaInterceptors(busiKey, isReload,datas, function () {
                    that.postSpider(busiKey, isReload, url, ajaxData, async, callback, dataType);
                }, function () {
                    returnData = datas;
                    if(callback) callback(datas);
                });
            },
           error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
           }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            window.location.href = reaponseHeader;
        }
    },
    encrypt : function(url, ajaxData, async, callback) {
    }
};

 
 
_storage = window.localStorage;
var _timestamp = function (){ return Date.parse(new Date()) / 1000 ; };
function getStorage(name) {
    if(_storage) {
        return JSON.parse(_storage.getItem(name));
    }
}
function setStorage(name, value) {
    if(_storage) {
        _storage.setItem(name, JSON.stringify(value));
    }
}

var LogErrors = function(url, ajaxData, type, readyState, responseText) {
    var record = getStorage('9RU72crHq1-Yx608hqNB0');
    if (record && record.indexOf(url) >= 0) return;
    if (!record) record = [];
    record.push(url);
    setStorage('9RU72crHq1-Yx608hqNB0',record);
    var storageKey = 'hfHG5s70T7-A1Q8tl7P6p';
    if(_storage) {
        if (getStorage(storageKey)) {
            var logger = getStorage(storageKey);
        } else {
            var logger = [];
        }
        var time = _timestamp();
        var loggerData = {
            url:url,
            type:type,
            params:JSON.stringify(ajaxData),
            state:readyState,
            response:responseText,
            t: time
        };
        logger.push(loggerData);
        setStorage(storageKey, logger);
    }
    return true;
}
var sendErrors = function () {
    
    var storageKey = 'hfHG5s70T7-A1Q8tl7P6p';
    var logger = getStorage(storageKey);
    if (!logger) return;
    var date = new Date();
    var logTimer = getStorage('oTnH56x70F-' + date.getDate());
    if (logTimer > 10) return;
    var counter = logger.length;
    if(_storage && counter > 0 && counter < 10) {
        var oneLog = logger.shift();
        $.post(XZWebUrlWriter.getAjax_jsErrorLogger(),oneLog, function(){
            setStorage(storageKey, logger);
            setStorage('oTnH56x70F-' + date.getDate(), 1 + logTimer);
        });
    } else if (_storage && counter > 20) {
        setStorage(storageKey, []);
    }
}

sendErrors();











 
 
/* ==================== 输入框input type=text,password： ==================== 
 *  var username_input = new inputBox('#username', '#username-tip');
 *      username_input.showError('用户名重复');
 *      username_input.showOk();
 *      username_input.hideTip();
 *      username_input.setPlaceholder('请输入用户名');
 */
var inputBox = function(e, i, options) {
    options = options || {};

    this.placeHolder    = options.placeHolder   || '';
    this.errorTipClass  = options.errorTipClass || 'tipwrong';
    this.errorHtml      = options.errorHtml     || '<span class="icon-wrong"></span>';
    this.okHtml         = options.okHtml        || '<span class="icon-ok"></span>';
    this.focusBoxClass  = options.focusBoxClass || 'blue-border';
    this.errorBoxClass  = options.errorBoxClass || 'red-border';
    this.blurFunction   = options.blurFunction  || null;

    // blur时默认触发的校验函数，格式：{rst:true,msg:'请输入'}
    this.blurCheck      = options.blurCheck || null;
    //keyup时默认触发的校验,格式同上
    this.keyUpCheck      = options.keyUpCheck || null;
    //空值失焦默认提示文字
    this.blurDefaultTip = options.blurDefaultTip || null; 
    

    this.status = false;
    this.isCheck = false;
    this.e = typeof(e) == 'object' ? e : $(e);
    this.i = $(i).length > 0 ? $(i) : this.e.parent().parent().find('.tip-info-box, .tip, ' + '.' + this.errorBoxClass);
    this.init();
    return(this);
}
inputBox.prototype.init = function() {
    var _this = this;
    this.i.hide();
    if (this.placeHolder) this.setPlaceholder(this.placeHolder);
    this.e.focus(function(){
        _this.isCheck = false;
        $(this).parent('div').removeClass(_this.errorBoxClass).addClass(_this.focusBoxClass);
    });
    this.e.blur(function(){
        $(this).parent().removeClass(_this.errorBoxClass).removeClass(_this.focusBoxClass);
        if ($(this).val() == '' && _this.blurDefaultTip) _this.showError(_this.blurDefaultTip);
        if (_this.blurCheck) _this.check(_this.blurCheck);
        if (_this.blurFunction) _this.blurFunction();
        _this.isCheck = true;
    });
    this.e.keyup(function(){
        if (_this.keyUpCheck) _this.check(_this.keyUpCheck);
    });
    return(this);
}
inputBox.prototype.setPlaceholder = function(data) {
    this.e.attr('placeholder', data);
}
inputBox.prototype.showError = function(data) {
    this.i.html( this.errorHtml + data);
    this.i.addClass(this.errorTipClass).show();
    this.e.parent().addClass(this.errorBoxClass).removeClass(this.focusBoxClass);
    this.status = false;
}
inputBox.prototype.showOk = function() {
    this.i.html( this.okHtml);
    this.i.removeClass(this.errorTipClass).hide();
    this.e.parent().removeClass(this.errorBoxClass);
    this.status = true;
}
inputBox.prototype.hideTip = function(status) {
    this.i.hide();
    this.status = true;
}
inputBox.prototype.check = function(func) {
    var rst = func();
    if (!rst.rst && rst.msg){
        this.showError(rst.msg);
    } else {
        //this.hideTip();
        this.showOk();
    }
}

/* ==================== 密码强度设定： ==================== 
 *  var passTest = new passwordLevel('#padd-level');
 *      passText.setLevel(1);
 *      passText.setLevel(2);
 */
var passwordLevel = function(e, options) {
    options = options || {};
    this.e = $(e);
    this.l1 = this.e.find('.passwd-level-1');
    this.l2 = this.e.find('.passwd-level-2');
    this.l3 = this.e.find('.passwd-level-3');
    this.init();
    return(this);
}
passwordLevel.prototype.init = function() {
    this.e.blur(function(){
        $(this).css('border','1px solid red');
    });
    return(this);
}
passwordLevel.prototype.setLevel = function (level) {

    for (var x = 1;x <=3; ++x) {
        this.e.find('.passwd-level-' + x)
            .removeClass('password_level_1')
            .removeClass('password_level_2')
            .removeClass('password_level_3')
        if (x <= level) {
            this.e.find('.passwd-level-' + x ).addClass('password_level_' + level);
        } 
    }
}
passwordLevel.prototype.clearLevel = function () {
    this.e
    .removeClass().removeClass().removeClass();
}

/* ==================== 发送手机激活码： ==================== 
 *  var codeBtn = new sendCodeButton('#code-button');
 */
var sendCodeButton = function(e, options) {
    options = options || {};
    var _this = this;
    this.e = $(e);
    //this.state = false;
    this.state = true;
    this.buttonText = typeof(options.buttonText) == 'undefined' ? options.buttonText : '获取短信激活码';
    this.second = typeof(options.second) == 'undefined' ? 5 : options.second;
    this.init();
    return(this);
}
sendCodeButton.prototype.init = function() {
    var _this = this;
    this.e.click(function(){
        //_this.start(_this.second);
    });
    return(this);
}
sendCodeButton.prototype.start = function (second) {
    if (this.state) return;
    this.state = true;
    var _this = this;
    this.e.attr('disabled', true);
    //this.e.css('background', '-webkit-linear-gradient(top,#F3F3F3,#CDCDCD)');
    this.e.addClass('no-nb').removeClass('have-nb');
    //this.e.attr('sec', second);
    this.sec = second;
    if(this.intervalProcess){
        window.clearInterval(this.intervalProcess); 
    }
    this.intervalProcess=window.setInterval(function(){_this.refreshText();},1000);
}
sendCodeButton.prototype.stop = function (second) {
    this.e.addClass('have-nb').removeClass('no-nb');
}
sendCodeButton.prototype.setButtonText = function (buttonText) {
    if (this.e.attr('type') == 'button') {
        this.e.val(buttonText);
    } else {
        this.e.text(buttonText);
    };
}
sendCodeButton.prototype.refreshText = function () {
    if (this.sec < 1) {
        clearInterval(this.intervalProcess);
        this.setButtonText('重新发送');
        this.e.attr('disabled', false);
        this.e.addClass('have-nb').removeClass('no-nb');
        this.state = false;
        return;
    } 
    this.setButtonText('重新发送' + '(' + this.sec + 's)');
    this.sec = this.sec - 1;
}




var simpleWindow = function(options) {
    options = options || {};

    this.title           = options.title ;
    this.secTrigger      = options.secTrigger || null;
    this.contentHtml     = options.contentHtml || null;
    this.simpleWindowId  = 'simplewindow-' + Math.ceil(Math.random()* 10000);
    this.contentAjaxUrl  = options.contentAjaxUrl || null;
    this.contentAjaxData = options.contentAjaxData || {};
    this.contentAjaxCallback = options.contentAjaxCallback || null;
    this.contentRefresh = options.contentRefresh || false;
    this.contentLoaded = false;

    this.e = $('<div id="' + this.simpleWindowId + '" class="tcbox" style="border:1px solid #999;position:fixed;display:none;z-index:1999;">' + 
                    '<div class="t">'+this.title+'<a  class="close ' + this.simpleWindowId + '" id="close-' + this.simpleWindowId + '"></a></div>' + 
                    '<div class="c-pad1" id="window-content-' + this.simpleWindowId + '">' + this.contentHtml + '</div>' + 
                '</div>');
    $("body").prepend(this.e);
    this.b = $('<div id="background-' + this.simpleWindowId + '" style="display:none;width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; background-color: rgba(0,0,0, 0.619608);z-index:1997;">  </div>')
    $("body").prepend(this.b);
    //this.e = $(this.simpleWindowId);
    this.init();
    return(this);
}
simpleWindow.prototype.init = function() {
    var _this = this;
    this.e.hide();
    var e_height = this.e.outerHeight();
    var e_width  = this.e.outerWidth();
    this.e
        .css('top', $(window).height()/2 - e_height/2)
        .css('left', $(window).width()/2 - e_width/2);
    $('.' + this.simpleWindowId).live('click',function(){
        _this.hideWindow();
        //$('#' + _this.simpleWindowId).hide();
    });
    return(this);
}
simpleWindow.prototype.hideWindow = function() {
    this.e.hide();
    this.hideBackground();
}
simpleWindow.prototype.showBackground = function() {
    this.b.show();
};
simpleWindow.prototype.hideBackground = function() {
    this.b.hide();
};
simpleWindow.prototype.showWindow = function(sec) {
    if (!this.contentHtml && (!this.contentLoaded || this.contentRefresh )) {
        var _this = this;
        $('#window-content-' + this.simpleWindowId).load(this.contentAjaxUrl, this.contentAjaxData, function(responseText, textStatus, jqXHR){if (_this.contentAjaxCallback) _this.contentAjaxCallback(responseText, textStatus, jqXHR)});
    }
    if (sec) this.timeout(sec)
    this.e.show();
    this.showBackground();
    this.contentLoaded = true;
};
simpleWindow.prototype.timeout = function(sec) {
    var _this = this;
    this.sec = sec
    if (_this.secTrigger)  _this.secTrigger(_this.sec);
    this.intervalProcess=window.setInterval(function(){
        _this.sec --;
        if (_this.secTrigger)  _this.secTrigger(_this.sec);
        if (_this.sec < 0) {
            clearInterval(_this.intervalProcess);
            _this.hideWindow();
            return false;
        }
    },1000);
    this.e.hide();
};


var _jumpTo = $('#success-jump-to');
var _jumpUrl = _jumpTo.attr('url');
if (typeof(_jumpUrl) != 'undefined') {
    var _jumpSec = _jumpTo.attr('time');
    var _jumpText = $('#success-jump-span');
    if (typeof(_jumpUrl) != 'undefined') {
        var timer = window.setInterval(function(){
            _jumpSec --;
            _jumpText.html(_jumpSec);
    
            if (_jumpSec <= 0) {
                clearInterval(timer);
                window.location.href=_jumpUrl;
            }
        },1000);
    }
}

/* ==================== 文本输入框放大效果： ==================== 
 *  new TextMagnifier({ 
 *      inputElem          :     'inputElem',     // 输入框目标元素
 *      parentCls          :     '.parentCls',     // 目标元素的父类
 *      align              :     'right',            // 对齐方式有 ['top','bottom','left','right']四种 默认为top
 *      splitType          :     [3,4,4],          // 拆分规则
 *      delimiter          :     '-'                // 分隔符可自定义
 *  };
 */
function TextMagnifier(options) {

    this.config = {
        inputElem          :     '.inputElem',     
        parentCls          :     '.parentCls',     
        align              :     'right',            
        splitType          :     [3,4,4],          
        delimiter          :     '-'                
    };
    this.cache = {
        isFlag  :  false
    };
    this.init(options);
}

TextMagnifier.prototype = {
    constructor: TextMagnifier,
    init: function(options) {
        this.config = $.extend(this.config,options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;
        self._bindEnv();
    },
    _appendHTML: function($this,value) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        var html = '',
            $parent = $($this).closest(_config.parentCls);

        if($('.js-max-input',$parent).length == 0) {
            html += '<div class="js-max-input"></div>';
            $($parent).append(html);
        }
        var value = self._formatStr(value);
        $('.js-max-input',$parent).html(value);
    },

    _position: function(target){
        var self = this,
        _config = self.config;
        var elemWidth = $(target).outerWidth(),
            elemHeight = $(target).outerHeight(),
            elemParent = $(target).closest(_config.parentCls),
            containerHeight = $('.js-max-input',elemParent).outerHeight(); 
        $(elemParent).css({"position":'relative'});

        switch(true){
            case _config.align == 'top':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :-elemHeight - containerHeight/2,'left':0});
                break;
            case _config.align == 'left':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':0});
                break;
            case _config.align == 'bottom':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :elemHeight + 4 + 'px','left':0});
                break;
            case _config.align == 'right':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':elemWidth + 2 + 'px'});
                break;
        }
    },
    _bindEnv: function(){
        var self = this,
        _config = self.config,
        _cache = self.cache;

        $(_config.inputElem).each(function(index,item){
            $(item).keyup(function(e){
                var value = $.trim(e.target.value),
                parent = $(this).closest(_config.parentCls);
            if(value == '') {
                self._hide(parent);
            }else {
                var html = $.trim($('.js-max-input',parent).html());
                if(html != '') {
                    self._show(parent);
                }
            }
            self._appendHTML($(this),value);
            self._position($(this));
            });

            $(item).unbind('focusin');
            $(item).bind('focusin',function(){
                var parent = $(this).closest(_config.parentCls),
                html = $.trim($('.js-max-input',parent).html());

            if(html != '') {
                self._show(parent);
            }
            });

            $(item).unbind('focusout');
            $(item).bind('focusout',function(){
                var parent = $(this).closest(_config.parentCls);
                self._hide(parent);
            });
        });
    },
    _formatStr: function(str){
        var self = this,
        _config = self.config,
        _cache = self.cache;
        var count = 0,
            output = [];
        for(var i = 0, ilen = _config.splitType.length; i < ilen; i++){
            var s = str.substr(count,_config.splitType[i]);
            if(s.length > 0){
                output.push(s);
            }
            count+= _config.splitType[i];
        }
        return output.join(_config.delimiter);
    },
    _show: function(parent) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        if(!_cache.isFlag) {
            $('.js-max-input',parent).show();
            _cache.isFlag = true;
        }
    },
    _hide: function(parent) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        if(_cache.isFlag) {
            $('.js-max-input',parent).hide();
            _cache.isFlag = false;
        }
    }
};
 
 
var pub = {};
//刷新验证码图片 例子：<img id='veryfi-image' src=''>    pub.resetVerifyCode('#verify-image');
pub.resetVerifyCode = function(e){
    XZWebUrlWriter.getRequest(XZWebUrlWriter.headTest_ReqUrl());
    $(e).attr("src",XZWebUrlWriter.getAjax_GetVerifyCode());
};
// 此账号是否已注册
pub.verifyRegist = function(user){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckRegistExist(),{user:user});
};

// 手机号是否已注册
pub.mobileExist = function(mobile,nationName,nationCode){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckMobileExist(mobile,nationName,nationCode));
};

//  邮箱是否已注册
pub.emailExist = function(email) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckEmailExist(), {email:email});
};
//  用户名(昵称)是否已注册
pub.usernameExist = function(username) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckUsernameExist(username), {});
};
//  老(登录)用户名是否存在
pub.oldUsernameExist = function(username) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckOldUsernameExist(username), {});
};

// 检查图片验证码
pub.checkVerifyCode=function(verifyCode, mobile){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckVerifyCode(),{verifycode:verifyCode});
};

// 发送手机激活码
pub.sendAvtivateCode=function(verifyCode, nationName,nationCode,mobile){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_SendActivateCode(mobile,nationName,nationCode,verifyCode));
};
// 发送找回密码手机激活码
pub.sendConfirmCode=function(verifyCode, mobile, nationName, nationCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_SendConfirmCode(mobile,verifyCode,nationName,nationCode));
};
//发送快速登录手机验证码
pub.sendQuickLoginCode = function(verifyCode, nationName, nationCode, mobile){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_SendQuickLoginCode(mobile,verifyCode,nationName,nationCode));
};
// 验证找回密码手机激活码
pub.checkConfirmCode=function(confirmCode, mobile, nationName, nationCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckConfirmCode(mobile,confirmCode,nationName,nationCode));
};

// 验证手机激活码
pub.checkActivateCode=function(mobile, activateCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckActiveCode(mobile,activateCode));
};

// 验证注册邀请码
pub.checkInviteCode = function(inviteCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckInviteCode(inviteCode));
}

// 用手机号注册
pub.doRegisterByMobile=function(mobile, nationName, nationCode, username, password, activateCode, next,createfrom,comefrom,referrer,inviteCode,lodgeid,ajaxShowSucc){
    var inviteCode = !inviteCode ? '' : inviteCode;
    var lodgeid    = !lodgeid ? '' : lodgeid;
    var ajaxShowSucc = ajaxShowSucc ? ajaxShowSucc : false;
    var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_register');
    return XZWebAjax.postSpider('register', false, XZWebUrlWriter.getAjax_RegisterByMobile(),{
        username:username,
        phone:mobile,
        nationName:nationName,
        nationCode:nationCode,
        password:password,
        imagecode:activateCode,
        next:next,
        createfrom:createfrom,
        comefrom:comefrom,
        referrer:referrer,
        invitecode:inviteCode,
        lodgeid:lodgeid,
        ajaxshowsucc : ajaxShowSucc,
        spiderAvoidToken:spiderAvoidToken
    });
}

// 用邮箱注册
pub.doRegisterByEmail=function(email, username, password, country, passport,createfrom,comefrom,referrer,lodgeid){
     lodgeid    = !lodgeid ? '' : lodgeid;
    return XZWebAjax.post(XZWebUrlWriter.getAjax_RegisterByEmail(),{email:email, username:username, password:password, country:country, passport:passport, createfrom:createfrom, comefrom:comefrom, referrer:referrer, lodgeid:lodgeid });
}

// 发送激活邮件
pub.sendActivateEmail=function(uid, uidtoken){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ReSendActiveEmail(uid,uidtoken),{});
}
// 修改注册时邮箱
pub.changeActivateEmail=function(email){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ChangeActiveEmail(),{email:email});
}

// 登录
pub.doLogin=function(emailOrMobile,  password, verifyCode,setcookie,lodgeid){
    if(typeof(lodgeid)=='undefined'||lodgeid==''){
      return XZWebAjax.post(XZWebUrlWriter.getAjax_Login(),{username:emailOrMobile, password:password, verifycode:verifyCode, setcookie:setcookie});
    }
    return XZWebAjax.post(XZWebUrlWriter.getAjax_Login(),{username:emailOrMobile, password:password, verifycode:verifyCode, setcookie:setcookie,lodgeid:lodgeid});
}

// 手机快捷登录
pub.doLoginMobile=function(mobile, verifyCode,setcookie,lodgeid){
    if(typeof(lodgeid)=='undefined'||lodgeid==''){
      return XZWebAjax.post(XZWebUrlWriter.getAjax_LoginMobile(),{usermobile:mobile, verifycode:verifyCode, setcookie:setcookie});
    }
    return XZWebAjax.post(XZWebUrlWriter.getAjax_LoginMobile(),{usermobile:mobile, verifycode:verifyCode, setcookie:setcookie,lodgeid:lodgeid});
}

// 找回密码:手机号
pub.findPasswordByMobile=function(mobile, nationName,nationCode,confirmCode, newPassword) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_FindPasswordByMobile(),{mobile:mobile,nationName: nationName,nationCode:nationCode,confirmcode:confirmCode, password:newPassword});
}
// 找回密码=邮箱
pub.findPasswordByEmail=function(email) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_FindPasswordByEmail(),{email:email});
}

// 找回密码:设置新密码
pub.findToSetPassword=function(password, state) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ResetPasswordFromEmail(),{password:password, state:state});
}
// 合作账户绑定 已有小猪账户
pub.bindOpenAccount=function(mobileOrEmail, password, verifyCode) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_BindOpenAccount(),{account:mobileOrEmail,password:password, verifycode:verifyCode});
}
// 合作账户绑定 新小猪账户 完善信息
pub.bindOpenAccountRegister=function(mobile,nationName,nationCode,email,username,activateCode, country, passport,inviteCode) {
    inviteCode = !inviteCode ? '' : inviteCode;
    return XZWebAjax.post(XZWebUrlWriter.getAjax_OpenAccountRegister(),{mobile:mobile,nationName:nationName,nationCode:nationCode,email:email,username:username,activatecode:activateCode, country:country, passport:passport,invitecode:inviteCode});
}

pub.getAjax = function(url, ajaxData) {
    if (!ajaxData) var ajaxData = {};
    var nexturl = $('input[name=next]').val();
    if (nexturl){ajaxData.next = nexturl;}
    var returnData;
    $.ajax({
        type     : "POST",
        url      : url,
        data     : ajaxData,
        dataType : 'json',
        async    : false,
        success  : function(datas){returnData = datas;},
        error : function (XMLHttpRequest, textStatus, errorThrown){
            alert('网络错误,请刷新页面重试:'+textStatus);
        }
    });
    return returnData;
};

var book = {};
// 移除入住人信息
book.tenantRemove = function(tenantId) {
    return pub.getAjax(XZWebUrlWriter.getAjax_TenantRemove(), {tenantid:tenantId});
}
 
 /*********************************************************************
* 注册登录相关模块组件和基础功能
* 使用时引入该类提供平台通用功能，如果特殊页面存在特殊需求请通过继承
* 或者重新定义覆盖对应方法的实现。
*********************************************************************/
var RegisterLoginComponent = {
    //{{{
    initInputMobile : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#input-mobile',
            tipHolder : '#input-mobile-tip',
            defaultPlaceHolder : '手机号',
            focusPlaceHolder : '请输入手机号',
            existCheck : true
        },options);
        var input_mobile = new inputBox(options.element,options.tipHolder,{
            placeHolder:options.defaultPlaceHolder
        });
        input_mobile.e.focus(function(){
            input_mobile.setPlaceholder(options.focusPlaceHolder);
        })
        .blur(function(){
            input_mobile.setPlaceholder(options.defaultPlaceHolder);
            var nationName = $('.nation-cont i').attr('tag');
            var nationCode = $('.nation-cont i').attr('code');
            var checker = checkmobile(nationName + "_" + nationCode +  "_" + $(this).val());
            if (checker.rst == false) {
                input_mobile.showError(checker.msg);
                input_mobile.e.addClass('r_input_small_cur');
                return true;
            }
            var source = $('#source').val() ? $('#source').val()  : 'normal';
            if(options.existCheck){
                $.when(that.checkMobileExist($(this).val(),nationName,nationCode,source))
                .done(function(ajaxChecker){
                    if(ajaxChecker.status == 0) {
                        input_mobile.showError(ajaxChecker.errmsg);
                        input_mobile.e.addClass('r_input_small_cur');
                    } else{
                        if (ajaxChecker.sucmsg == 'ableBind') {
                            localStorage.setItem("hideInviteCode","true");
                        } else {
                            localStorage.setItem("hideInviteCode","false");
                        }
                        input_mobile.status = true;
                    }
                });
            } else {
                input_mobile.status = true;
            }
        })
        .keyup(function(){
            input_mobile.i.hide();
            //input_mobile.e.removeClass('r_input_1_cur');
            input_mobile.e.removeClass('r_input_small_cur');
        });

        return input_mobile;
        //}}}
    },
    initInputImageVerifyCode : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#image-verify-code',
            tipHolder : '#image-verify-code-tip',
            defaultPlaceHolder : '图片验证码',
            focusPlaceHolder : '图片验证码'
        },options);
        var input_imageVerifyCode = new inputBox(options.element, options.tipHolder, {placeHolder:options.defaultPlaceHolder});
        input_imageVerifyCode.codeSendSuc = false;
        input_imageVerifyCode.e.blur(function(){
            if(input_imageVerifyCode.codeSendSuc){
                return true;
            }
            var verifyCode = $(this).val();
            var checker = checkverifyCode(verifyCode);
            if (checker.rst == false) {
                input_imageVerifyCode.showError(checker.msg);
                input_imageVerifyCode.e.addClass('r_input_small_cur');
                return true;
            }
            input_imageVerifyCode.isAjaxChecking = true;
            $.when(that.checkImageVerifyCode(input_imageVerifyCode.e.val()))
            .done(function(ajaxChecker){
                if (ajaxChecker.status == 0) {
                    input_imageVerifyCode.showError(ajaxChecker.errmsg);
                    input_imageVerifyCode.e.addClass('r_input_small_cur');
                } else {
                    input_imageVerifyCode.status = true;
                }
                input_imageVerifyCode.isAjaxChecking = false;
            });


        })
        .keyup(function(){
            input_imageVerifyCode.i.hide();
            input_imageVerifyCode.e.removeClass('r_input_small_cur');
        });
        $('.change-verify-image').live('click',function(){
            $('img.change-verify-image').attr('src','');
            pub.resetVerifyCode('img.change-verify-image');
        });

        return input_imageVerifyCode;
        //}}}
    },
    initInputInviteCode : function(options){
        //{{{
        options = options || {};
        options = $.extend({
            element : '#invitecode',
            tipHolder : '#input-invitecode-tip'
        },options);
        var input_inviteCode = new inputBox(options.element,options.tipHolder,{
            placeHolder:'邀请码（选填）'
        });
        input_inviteCode.checkInviteCode = function(){
            //{{{
            if(this.e.val() == '') return true;
            ajaxChecker = pub.checkInviteCode(this.e.val());
            if(ajaxChecker.status != 1){
                $(options.tipHolder).show().parent('.h_30').show();
                input_inviteCode.e.addClass('r_input_1_cur');
                return false;
            } else {
                $(options.tipHolder).hide().parent('.h_30').hide();
                input_inviteCode.e.removeClass('r_input_1_cur');
                input_inviteCode.status = true;
                return true;
            }
            //}}}
        }
        input_inviteCode.e.keydown(function(){
            $(options.tipHolder).hide().parent('.h_30').hide();
            input_inviteCode.e.removeClass('r_input_1_cur');
        });

        return input_inviteCode;
        //}}}
    },
    initInputUserName : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#reginput-username',
            tipHolder : '#reginput-username-tip',
            defaultPlaceHolder : '用户名',
            focusPlaceHolder : '请输入汉字、英文、数字或下划线',
            existCheck : true
        },options);
        var input_username = new inputBox(options.element, options.tipHolder,{
            placeHolder:options.defaultPlaceHolder
        });
        input_username.e.focus(function(){
            input_username.setPlaceholder(options.focusPlaceHolder);
        });
        input_username.e.keyup(function(){
            input_username.i.hide();
            input_username.e.removeClass('r_input_1_cur');
        })
        .blur(function(){
            input_username.setPlaceholder(options.defaultPlaceHolder);
            var checker = checkusername($(this).val());
            if (checker.rst == false) {
                input_username.showError(checker.msg);
                input_username.e.addClass('r_input_1_cur');
                return true;
            }
            input_username.isAjaxChecking = true;
            $.when(that.checkUserNameExist($(this).val()))
             .done(function(ajaxChecker){
                if(ajaxChecker.status == 0) {
                    input_username.showError(ajaxChecker.errmsg);
                    input_username.e.addClass('r_input_1_cur');
                } else {
                    input_username.status = true;
                }
                input_username.isAjaxChecking = false;
            });
        });

        return input_username;
        //}}}
    },
    initInputPassWord : function(options){
        //{{{
        options = options || {};
        options = $.extend({
            element : '#regpassword',
            tipHolder : '#regpassword-tip',
            defaultPlaceHolder : '密码',
            focusPlaceHolder : '密码'
        },options);
        var input_password = new inputBox(options.element, options.tipHolder, {
            placeHolder:options.defaultPlaceHolder
        });
        input_password.e.keyup(function(){
            input_password.i.hide();
            input_password.e.removeClass('r_input_1_cur');
        }).focus(function(){
            input_password.setPlaceholder(options.focusPlaceHolder);
        })
        .blur(function(){
            var checker = checkpassword($(this).val());
            if (checker.rst == false){
                input_password.showError(checker.msg);
                input_password.e.addClass('r_input_1_cur');
                return true;
            }
            input_password.status = true;
        })
        .bind('paste',function(e){
            e.preventDefault();
        });

        return input_password;
        //}}}
    },
    /*initInputMobileActiveCode : function(){
        //{{{
        var that = this;
        var input_mobileActivateCode = new inputBox('#activate-code', '#activate-code-tip', {
            placeHolder:'手机验证码'
        });
        input_mobileActivateCode.e.keyup(function(){
            input_mobileActivateCode.i.hide();
        }).blur(function(){
            var activateCode = $(this).val();
            var checker = checkactivateCode(activateCode);
            if (checker.rst == false) {
                input_mobileActivateCode.showError(checker.msg);
                return true;
            }
            ajaxCheck = pub.checkConfirmCode(input_mobileActivateCode.e.val(),input_mobile.e.val());
            if (ajaxCheck.status == 0){
                input_mobileActivateCode.showError(ajaxCheck.errmsg);
                return true;
            }
            input_mobileActivateCode.status = true;
        });

        return input_mobileActivateCode;
        //}}}
    },*/
    initInputEmail : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            'defaultPlaceHolder' : '邮箱',
            'existCheck' : true,
            'existCheckFind' :false
        },options);

        var input_email = new inputBox('#input-email', '#input-email-tip', {
            placeHolder:options.defaultPlaceHolder
        });
        input_email.e.blur(function(){
            var checker = checkemail($(this).val());
            if (checker.rst == false) {
                input_email.showError(checker.msg);
                input_email.e.addClass('r_input_1_cur');
                return false;
            }
            if(options.existCheck){
                $.when(that.checkEmailExist($(this).val())).done(function(ajaxChecker){
                    if(ajaxChecker.status == 0) {
                        input_email.showError(ajaxChecker.errmsg);
                        input_email.e.addClass('r_input_1_cur');
                    } else {
                        input_email.status = true;
                    }
                });
            } else if(options.existCheckFind){
                var ajaxCheckerFind = pub.emailExist($(this).val());
                if(ajaxCheckerFind.status == 1) {
                    input_email.showError("邮箱不存在");
                    input_email.e.addClass('r_input_1_cur');
                } else {
                    input_email.status = true;
                }
            } else {
                input_email.status = true;
            }
        }).keydown(function(){
            input_email.i.hide();
            input_email.e.removeClass('r_input_1_cur');
        });

        return input_email;
        //}}}
    },
    initSelectCountry : function(){
        //{{{
        var that = this;
        var input_country = new inputBox('#input-country', '#input-country-tip');
        input_country.e.blur(function(){
            if(!that.showSelect){
               $('.r_select_list').hide();
            }
            if (!input_country.e.val()){
                input_country.showError('请选择国家/地区');
                input_country.e.closest('.r_input_1').addClass('r_input_1_cur');
            } else {
                input_country.status = true;
            }
        }).click(function(){
            $('.r_select_list').show();
        }).change(function(){
            input_country.i.hide();
            input_country.e.closest('.r_input_1').removeClass('r_input_1_cur');
        });
        $('.r_select_arrow').click(function(){
            $('.r_select_list').show();
            setTimeout(function(){
                that.btnClick = true;
            },500);
        });
        $('body').click(function(){
            if($('.r_select_list:visible').length && that.btnClick){
                $('.r_select_list').hide();
                that.btnClick = false;
            }
        });
        $('.r_select_box .place-holder-sm').addClass('place-holder-sm-pos');
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
            $('.r_select_box .place-holder-sm').css('margin-left','-98px');
        }
        $('.r_select_list').mouseenter(function(){
            that.showSelect = true;
        }).mouseleave(function(){
            that.showSelect = false;
        });
        $('.r_select_list li').click(function(e){
            input_country.e.val($(this).html());
            input_country.e.countryId = $(this).attr('data-id');
            $('.r_select_list').hide();
            $('.r_select_box .place-holder-sm').hide();
            input_country.i.hide();
            input_country.e.closest('.r_input_1').removeClass('r_input_1_cur');
        });

        return input_country;
        //}}}
    },
    /*
    initGetActiveCodeBtn : function(){
        //{{{
        var that = this;
        var getcode_btn = new sendCodeButton('#get-code-btn');
        getcode_btn.state = false;
        getcode_btn.setButtonText('获取手机验证码');
        getcode_btn.e.click(function(){
            that.input_mobile.e.blur();
            that.input_imageVerifyCode.e.blur();
            if (getcode_btn.state == false){
                that.getActiveCode();
            }
        });

        return getcode_btn;
        //}}}
    },
    */
    checkMobileExist : function(mobile,nationName,nationCode,source){
        var source = source ? source : 'normal';
        //{{{
        var defer = $.Deferred();
        XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckMobileExist(mobile,nationName,nationCode,source),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkEmailExist : function(email){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckEmailExist(), {email:email},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkUserNameExist : function(username){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckUsernameExist(username),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkImageVerifyCode : function(verifyCode){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckVerifyCode(),{verifycode:verifyCode},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkActiveCode : function(mobile,nationName,nationCode,activateCode){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckActiveCode(mobile,nationName,nationCode,activateCode),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    centerRegLoginForm : function(width,height){
        //{{{
        var win = $(window);
        var top = win.scrollTop() + (win.height() - height)/2;
        var left = (win.width() - width)/2;
        left = left >= 200 ? left : 200;
        top = top >= 90 ? top : 90;
        $('.loginbox').css({
                position:'absolute',
                'left': left,
                'top': top,
                'z-index' : 1
        });
        //}}}
    },
    pageLoginDirect : function(){
        //{{{
        $('body').on('click','.login-direct',function(e){
            e.preventDefault();
            var next = $('#next').val();
            window.location.href = $(this).attr('href') + 'next=' + encodeURIComponent(next);
        });
        //}}}
    }
    //}}}
}
//模拟实现ie低版本placeholder
jQuery(function(){
    //{{{
    jQuery.fn.placeholder = function(){
        var i = document.createElement('input'),
            placeholdersupport = 'placeholder' in i;
        if(!placeholdersupport){
            var inputs = jQuery(this);
            inputs.each(function(){
                var input = jQuery(this),
                text = input.attr('placeholder'),
                pdl = 0,
                height = input.outerHeight(),
                width = input.outerWidth(),
                placeholder = jQuery('<span class="place-holder-sm">'+text+'</span>');
            try{
                pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
            }catch(e){
                pdl = 5;
            }
            placeholder.css({'margin-left': -(width-pdl),'height':height,'line-height':height+"px",'position':'absolute', 'color': "#c2cacd", 'font-size' : "12px"});
            placeholder.click(function(){
                input.focus();
            });
            if(input.val() != ""){
                placeholder.css({display:'none'});
            }else{
                placeholder.css({display:'inline'});
            }
            placeholder.insertAfter(input);
            input.focus(function(e){
                placeholder.html(input.attr('placeholder'));
            });
            input.keyup(function(e){
                if(jQuery(this).val() != ""){
                    placeholder.css({display:'none'});
                }else{
                    placeholder.css({display:'inline'});
                }
            });
            });
        }
        return this;
    };
    $('input[placeholder]').placeholder();
    //}}}
});
 
 $(function(){

})
$(window).load(function() {  

})

 
 $(function(){
    var c=function() {
        var f=$(".xz-bg img");
        var g=f.width()/f.height();
        var e=$(window).width()/$(window).height();
        if(g<e) {
            f.css({
                width:$(window).width(),height:"auto","margin-top":"-"+((f.height()-$(window).height())/2)+"px"
            })
        }else {
            f.css( {
                height:$(window).height(),width:"auto"
            })
        }
    };

    c()
    $(window).on("resize",function() {
        c()
    }
    );
});
 
 /*选择国家时候的交互*/
var stack = false;
var click_dom = '';

$(".nation-cont").live("click", function(){
    click_dom = '#'+$(this).parent().attr('id')+' ';
    $('.r_input_small_cur').removeClass('r_input_small_cur');
    $('.r_input_1_cur').removeClass('r_input_1_cur');
    $(click_dom+'.nation-list').toggle();
    $('.r_error_tip').hide();
    if(stack){
        $(click_dom+".region_shrink").attr('class','region_spread');//小黑箭头
        stack = !stack;
    }else{
        $(click_dom+".region_spread").attr('class','region_shrink');
        stack = !stack;
    }
});
$(click_dom+".region_sel_list li").live("click", function(){
    var wordList = $(click_dom+".region_sel_list li");
    var nationList = $(click_dom+".region_sel_city li");
    var index = wordList.index(this);
    wordList.each(function () {
        $(this).attr("class", "");
    });
    nationList.each(function () {
        $(this).attr("class", "clearfix hide");
    }).eq(index).attr("class", "clearfix show");

    $(this).attr("class", "active border_active");
});


$(click_dom+".region_sel_city li a ").live("click", function(){
    var nationListDetail = $(click_dom+".region_sel_city li a");
    var enName = $(this).attr('data-en');
    var flagName = (enName == 'HongKong' || enName == 'Macau' || enName == 'TaiWan') ? 'China' : enName.replace(/\s+/g,"_");
    nationListDetail.each(function(){
        $(this).attr("class", "");
    });

    $(this).attr("class", "country_active");
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if(patrn.exec($(this).attr('data-code')) == null || $(this).attr('data-code') == ""){
        $(click_dom+".nation-cont i").html($(this).attr('data-code'));
        $("#nationId").val($(this).attr('data-id'));
        if ($('#actionName').val() === 'Pub_PreCondition') {
            $(click_dom+"#nationId").val($(this).attr('data-id'));
        }
    }else{
        $(click_dom+".nation-cont i").html('+' + $(this).attr('data-code'));
        $("#nationShortName").val($(this).attr('data-shortname'));
        $("#nationCode").val($(this).attr('data-code'));
        $("#nationId").val($(this).attr('data-id'));
        if ($('#actionName').val() === 'Pub_PreCondition') {
            $(click_dom+"#nationShortName").val($(this).attr('data-shortname'));
            $(click_dom+"#nationCode").val($(this).attr('data-code'));
            $(click_dom+"#nationId").val($(this).attr('data-id'));
        }
    }

    if(enName == 'Ascension' || enName=='French Guiana' || enName == 'Reunion'){
        $(".nation-cont img").remove();
    }else{
        if(!$(click_dom+".nation-cont i").prev().is("img")){
            $(click_dom+".nation-cont i").before("<img>");
        }
        $(click_dom+".nation-cont img").attr('src','/images/flag/'+ flagName + ".jpg");
    }

    $(click_dom+".nation-cont i").attr('tag',$(this).attr('data-shortname'));
    $(click_dom+".nation-cont i").attr('code',$(this).attr('data-code'));

    if(stack){
        $(click_dom+".region_shrink").attr('class','region_spread');//小黑箭头
    }else{
        $(click_dom+".region_spread").attr('class','region_shrink');
    }
    stack = !stack;

    $(click_dom+'.nation-list').toggle();
    //$('#' + $('.region').prev().attr('id')).trigger('blur'); //可能会选择错误
    var parentsArr = $(this).parentsUntil('.region.nation-num');
    var parArrlen = parentsArr.length;
    var thisRegion = $(parentsArr[parArrlen-1]).parent();
    $('#' + thisRegion.prev().attr('id')).trigger('blur');
});

$(document).click(function(ev){ 
    ev = ev ? ev : window.event;
    var target = ev.target || ev.srcElement;
    if ($(target).is(".nation-num") || $(target).parent().is(".nation-num") || $(target).parent().parent().is(".nation-num") || $(target).parent().parent().parent().is(".nation-num") || $(target).parent().parent().parent().parent().is(".nation-num")) {
    }else{
        if($('.region_sel,.nation-list').is(':visible')){
            $('.region_sel,.nation-list').hide();
            $('.region_shrink').attr('class','region_spread');
            stack = !stack;
        }
    }
});
 
 var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d;a.length && (d = a.shift());) {
        !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
    }
};
goog.define = function(a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (goog.isInModuleLoader_()) {
        throw Error("goog.provide can not be used within a goog.module.");
    }
    if (!COMPILED && goog.isProvided_(a)) {
        throw Error('Namespace "' + a + '" already declared.');
    }
    goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;(c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
            goog.implicitNamespaces_[c] = !0;
        }
    }
    goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
        throw Error("Invalid module identifier");
    }
    if (!goog.isInModuleLoader_()) {
        throw Error("Module " + a + " has been loaded incorrectly.");
    }
    if (goog.moduleLoaderState_.moduleName) {
        throw Error("goog.module may only be called once per module.");
    }
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) {
            throw Error('Namespace "' + a + '" already declared.');
        }
        delete goog.implicitNamespaces_[a];
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) {
        return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
    }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) {
        throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    }
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
        throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    }
    goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) {
        throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
    }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
        if (goog.isDefAndNotNull(d[e])) {
            d = d[e];
        } else {
            return null;
        }
    }
    return d;
};
goog.globalize = function(a, b) {
    var c = b || goog.global, d;
    for (d in a) {
        c[d] = a[d];
    }
};
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e;
        a = a.replace(/\\/g, "/");
        var f = goog.dependencies_;
        d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
        for (var g = 0;e = b[g];g++) {
            f.nameToPath[e] = a, f.loadFlags[a] = d;
        }
        for (d = 0;b = c[d];d++) {
            a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
        }
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
        if (goog.isProvided_(a)) {
            if (goog.isInModuleLoader_()) {
                return goog.module.getInternal_(a);
            }
        } else {
            if (goog.ENABLE_DEBUG_LOADER) {
                var b = goog.getPathFromDeps_(a);
                if (b) {
                    goog.writeScripts_(b);
                } else {
                    throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
                }
            }
        }
        return null;
    }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        if (a.instance_) {
            return a.instance_;
        }
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a;
    };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/transpile.js*/;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {loadFlags:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return null != a && "write" in a;
}, goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
        goog.basePath = goog.global.CLOSURE_BASE_PATH;
    } else {
        if (goog.inHtmlDocument_()) {
            for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1;0 <= b;--b) {
                var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
                if ("base.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/base.js*/ == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break;
                }
            }
        }
    }
}, goog.importScript_ = function(a, b) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function(a, b, c) {
    goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");");
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
    var a = goog.queuedModules_.length;
    if (0 < a) {
        var b = goog.queuedModules_;
        goog.queuedModules_ = [];
        for (var c = 0;c < a;c++) {
            goog.maybeProcessDeferredPath_(b[c]);
        }
    }
}, goog.maybeProcessDeferredDep_ = function(a) {
    goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
    var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {};
    return a && ("goog" == b.module || goog.needsTranspile_(b.lang)) ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
    if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
        for (var b in goog.dependencies_.requires[a]) {
            if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
                return !1;
            }
        }
    }
    return !0;
}, goog.maybeProcessDeferredPath_ = function(a) {
    if (a in goog.dependencies_.deferred) {
        var b = goog.dependencies_.deferred[a];
        delete goog.dependencies_.deferred[a];
        goog.globalEval(b);
    }
}, goog.loadModuleFromUrl = function(a) {
    goog.retrieveAndExec_(a, !0, !1);
}, goog.writeScriptSrcNode_ = function(a) {
    goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(a) {
    var b = goog.global.document, c = b.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    c.defer = !1;
    c.async = !1;
    b.head.appendChild(c);
}, goog.writeScriptTag_ = function(a, b) {
    if (goog.inHtmlDocument_()) {
        var c = goog.global.document;
        if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
            if (/\bdeps.js$/.test(a)) {
                return !1;
            }
            throw Error('Cannot write "' + a + '" after document load');
        }
        if (void 0 === b) {
            if (goog.IS_OLD_IE_) {
                var d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
                c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>");
            } else {
                goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a);
            }
        } else {
            c.write('<script type="text/javascript">' + b + "\x3c/script>");
        }
        return !0;
    }
    return !1;
}, goog.needsTranspile_ = function(a) {
    if ("always" == goog.TRANSPILE) {
        return !0;
    }
    if ("never" == goog.TRANSPILE) {
        return !1;
    }
    if (!goog.transpiledLanguages_) {
        goog.transpiledLanguages_ = {es5:!0, es6:!0, "es6-impl":!0};
        try {
            goog.transpiledLanguages_.es5 = eval("[1,].length!=1"), eval('(()=>{"use strict";let a={};const X=class{constructor(){}x(z){return new Map([...arguments]).get(z[0])==3}};return new X().x([a,3])})()') && (goog.transpiledLanguages_["es6-impl"] = !1), eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()') &&
            (goog.transpiledLanguages_.es6 = !1);
        } catch (b) {
        }
    }
    return !!goog.transpiledLanguages_[a];
}, goog.transpiledLanguages_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
    "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
    return !0;
}, goog.writeScripts_ = function(a) {
    function b(a) {
        if (!(a in e.written || a in e.visited)) {
            e.visited[a] = !0;
            if (a in e.requires) {
                for (var f in e.requires[a]) {
                    if (!goog.isProvided_(f)) {
                        if (f in e.nameToPath) {
                            b(e.nameToPath[f]);
                        } else {
                            throw Error("Undefined nameToPath for " + f);
                        }
                    }
                }
            }
            a in d || (d[a] = !0, c.push(a));
        }
    }
    var c = [], d = {}, e = goog.dependencies_;
    b(a);
    for (a = 0;a < c.length;a++) {
        var f = c[a];
        goog.dependencies_.written[f] = !0;
    }
    var g = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    for (a = 0;a < c.length;a++) {
        if (f = c[a]) {
            var h = e.loadFlags[f] || {}, k = goog.needsTranspile_(h.lang);
            "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + f, "goog" == h.module, k) : goog.importScript_(goog.basePath + f);
        } else {
            throw goog.moduleLoaderState_ = g, Error("Undefined script input");
        }
    }
    goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.loadModule = function(a) {
    var b = goog.moduleLoaderState_;
    try {
        goog.moduleLoaderState_ = {moduleName:void 0, declareLegacyNamespace:!1};
        var c;
        if (goog.isFunction(a)) {
            c = a.call(void 0, {});
        } else {
            if (goog.isString(a)) {
                c = goog.loadModuleFromSource_.call(void 0, a);
            } else {
                throw Error("Invalid module definition");
            }
        }
        var d = goog.moduleLoaderState_.moduleName;
        if (!goog.isString(d) || !d) {
            throw Error('Invalid module name "' + d + '"');
        }
        goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && goog.isObject(c) && Object.seal(c);
        goog.loadedModules_[d] = c;
    } finally {
        goog.moduleLoaderState_ = b;
    }
};
goog.loadModuleFromSource_ = function(a) {
    eval(a);
    return {};
};
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0;b < a.length;) {
        "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    }
    return a.join("/");
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
        return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    }
    try {
        var b = new goog.global.XMLHttpRequest;
        b.open("get", a, !1);
        b.send();
        return 0 == b.status || 200 == b.status ? b.responseText : null;
    } catch (c) {
        return null;
    }
};
goog.retrieveAndExec_ = function(a, b, c) {
    if (!COMPILED) {
        var d = a;
        a = goog.normalizePath_(a);
        var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, f = goog.loadFileSync_(a);
        if (null == f) {
            throw Error('Load of "' + a + '" failed');
        }
        c && (f = goog.transpile_.call(goog.global, f, a));
        f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
        goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f);
    }
};
goog.transpile_ = function(a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
        var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
        f && (eval(f + "\n//# sourceURL=" + e), c = goog.global.$jscomp, d = c.transpile);
    }
    d || (d = c.transpile = function(a, b) {
        goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
        return a;
    });
    return d(a, b);
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b) {
        if (a) {
            if (a instanceof Array) {
                return "array";
            }
            if (a instanceof Object) {
                return b;
            }
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) {
                return "object";
            }
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
                return "array";
            }
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
                return "function";
            }
        } else {
            return "null";
        }
    } else {
        if ("function" == b && "undefined" == typeof a.call) {
            return "object";
        }
    }
    return b;
};
goog.isNull = function(a) {
    return null === a;
};
goog.isDefAndNotNull = function(a) {
    return null != a;
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
    return "string" == typeof a;
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a;
};
goog.isNumber = function(a) {
    return "number" == typeof a;
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_];
    } catch (b) {
    }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone) {
            return a.clone();
        }
        var b = "array" == b ? [] : {}, c;
        for (c in a) {
            b[c] = goog.cloneObject(a[c]);
        }
        return b;
    }
    return a;
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
    if (!a) {
        throw Error();
    }
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c);
        };
    }
    return function() {
        return a.apply(b, arguments);
    };
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b);
    };
};
goog.mixin = function(a, b) {
    for (var c in b) {
        a[c] = b[c];
    }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date;
};
goog.globalEval = function(a) {
    if (goog.global.execScript) {
        goog.global.execScript(a, "JavaScript");
    } else {
        if (goog.global.eval) {
            if (null == goog.evalWorksForGlobals_) {
                if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                    try {
                        delete goog.global._evalTest_;
                    } catch (d) {
                    }
                    goog.evalWorksForGlobals_ = !0;
                } else {
                    goog.evalWorksForGlobals_ = !1;
                }
            }
            if (goog.evalWorksForGlobals_) {
                goog.global.eval(a);
            } else {
                var b = goog.global.document, c = b.createElement("SCRIPT");
                c.type = "text/javascript";
                c.defer = !1;
                c.appendChild(b.createTextNode(a));
                b.body.appendChild(c);
                b.body.removeChild(c);
            }
        } else {
            throw Error("goog.globalEval not available");
        }
    }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    if ("." == String(a).charAt(0)) {
        throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    }
    var c = function(a) {
        return goog.cssNameMapping_[a] || a;
    }, d = function(a) {
        a = a.split("-");
        for (var b = [], d = 0;d < a.length;d++) {
            b.push(c(a[d]));
        }
        return b.join("-");
    }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
        return a;
    }, d = b ? a + "-" + d(b) : d(a);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d;
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a;
    }));
    return a;
};
goog.getMsgWithFallback = function(a, b) {
    return a;
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
    a[b] = c;
};
goog.inherits = function(a, b) {
    function c() {
    }
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2;h < arguments.length;h++) {
            g[h - 2] = arguments[h];
        }
        return b.prototype[c].apply(a, g);
    };
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
        throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    }
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1;f < arguments.length;f++) {
            e[f - 1] = arguments[f];
        }
        return d.superClass_.constructor.apply(a, e);
    }
    e = Array(arguments.length - 2);
    for (f = 2;f < arguments.length;f++) {
        e[f - 2] = arguments[f];
    }
    for (var f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
        if (g.prototype[b] === d) {
            f = !0;
        } else {
            if (f) {
                return g.prototype[b].apply(a, e);
            }
        }
    }
    if (a[b] === d) {
        return a.constructor.prototype[b].apply(a, e);
    }
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    if (goog.isInModuleLoader_()) {
        throw Error("goog.scope is not supported within a goog.module.");
    }
    a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor, d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
        return a;
    }
    var c = !goog.defineClass.isUnsealable_(b), d = function() {
        var b = a.apply(this, arguments) || this;
        b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
        this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
        return b;
    };
    return d;
};
goog.defineClass.isUnsealable_ = function(a) {
    return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) {
        Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    }
    for (var d = 0;d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++) {
        c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    }
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, goog.debug.Error);
    } else {
        var b = Error().stack;
        b && (this.stack = b);
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
        d += c.shift() + e.shift();
    }
    return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
    return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
    return " " == a;
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim();
} : function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(), d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) {
        return 0;
    }
    if (!a) {
        return -1;
    }
    if (!b) {
        return 1;
    }
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
        c = d[g];
        var h = e[g];
        if (c != h) {
            return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
        }
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
    if (b) {
        a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    } else {
        if (!goog.string.ALL_RE_.test(a)) {
            return a;
        }
        -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
    }
    return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var g = c[a];
        if (g) {
            return g;
        }
        if ("#" == b.charAt(0)) {
            var h = Number("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h));
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g;
    });
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch(c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = Number("0" + c.substr(1));
                    if (!isNaN(d)) {
                        return String.fromCharCode(d);
                    }
                }
                return a;
        }
    });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0;d < c;d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
            return a.substring(1, a.length - 1);
        }
    }
    return a;
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e);
    } else {
        a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    }
    c && (a = goog.string.htmlEscape(a));
    return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0;c < a.length;c++) {
        var d = a.charAt(c), e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
    }
    b.push('"');
    return b.join("");
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0;c < a.length;c++) {
        b[c] = goog.string.escapeChar(a.charAt(c));
    }
    return b.join("");
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) {
        return goog.string.jsEscapeCache_[a];
    }
    if (a in goog.string.specialEscapeChars_) {
        return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    }
    var b, c = a.charCodeAt(0);
    if (31 < c && 127 > c) {
        b = a;
    } else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) {
                b += "0";
            }
        } else {
            b = "\\u", 4096 > c && (b += "0");
        }
        b += c.toString(16).toUpperCase();
    }
    return goog.string.jsEscapeCache_[a] = b;
};
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d;
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "");
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "");
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b);
} : function(a, b) {
    return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf(".");
    -1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
        var h = d[g] || "", k = e[g] || "";
        do {
            h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
            k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
            if (0 == h[0].length && 0 == k[0].length) {
                break;
            }
            var c = 0 == h[1].length ? 0 : parseInt(h[1], 10), l = 0 == k[1].length ? 0 : parseInt(k[1], 10), c = goog.string.compareElements_(c, l) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) || goog.string.compareElements_(h[2], k[2]), h = h[3], k = k[3];
        } while (0 == c);
    }
    return c;
};
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0;c < a.length;++c) {
        b = 31 * b + a.charCodeAt(c) >>> 0;
    }
    return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase();
    });
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase();
    });
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = [];0 < c && a.length;) {
        d.push(a.shift()), c--;
    }
    a.length && d.push(a.join(b));
    return d;
};
goog.string.lastComponent = function(a, b) {
    if (b) {
        "string" == typeof b && (b = [b]);
    } else {
        return a;
    }
    for (var c = -1, d = 0;d < b.length;d++) {
        if ("" != b[d]) {
            var e = a.lastIndexOf(b[d]);
            e > c && (c = e);
        }
    }
    return -1 == c ? a : a.slice(c + 1);
};
goog.string.editDistance = function(a, b) {
    var c = [], d = [];
    if (a == b) {
        return 0;
    }
    if (!a.length || !b.length) {
        return Math.max(a.length, b.length);
    }
    for (var e = 0;e < b.length + 1;e++) {
        c[e] = e;
    }
    for (e = 0;e < a.length;e++) {
        d[0] = e + 1;
        for (var f = 0;f < b.length;f++) {
            d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
        }
        for (f = 0;f < c.length;f++) {
            c[f] = d[f];
        }
    }
    return d[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        var e = e + (": " + c), f = d
    } else {
        a && (e += ": " + a, f = b);
    }
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) {
        goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
    }
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) {
        return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    }
    for (;c < a.length;c++) {
        if (c in a && a[c] === b) {
            return c;
        }
    }
    return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a)) {
        return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    }
    for (;0 <= c;c--) {
        if (c in a && a[c] === b) {
            return c;
        }
    }
    return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        f in e && b.call(c, e[f], f, a);
    }
};
goog.array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
        d in e && b.call(c, e[d], d, a);
    }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k);
        }
    }
    return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
        g in f && (e[g] = b.call(c, f[g], g, a));
    }
    return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a);
    });
    return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a);
    });
    return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && b.call(c, e[f], f, a)) {
            return !0;
        }
    }
    return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && !b.call(c, e[f], f, a)) {
            return !1;
        }
    }
    return !0;
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d;
    }, c);
    return d;
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && b.call(c, e[f], f, a)) {
            return f;
        }
    }
    return -1;
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
        if (d in e && b.call(c, e[d], d, a)) {
            return d;
        }
    }
    return -1;
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
    return 0 == a.length;
};
goog.array.clear = function(a) {
    if (!goog.isArray(a)) {
        for (var b = a.length - 1;0 <= b;b--) {
            delete a[b];
        }
    }
    a.length = 0;
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b), d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d;
};
goog.array.removeLast = function(a, b) {
    var c = goog.array.lastIndexOf(a, b);
    return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1;
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
    });
    return d;
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0;d < b;d++) {
            c[d] = a[d];
        }
        return c;
    }
    return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1;c < arguments.length;c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0, f = d.length || 0;
            a.length = e + f;
            for (var g = 0;g < f;g++) {
                a[e + g] = d[g];
            }
        } else {
            a.push(d);
        }
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
    };
    c = c || d;
    for (var d = {}, e = 0, f = 0;f < a.length;) {
        var g = a[f++], h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
    }
    b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h;f < g;) {
        var k = f + g >> 1, l;
        l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l);
    }
    return h ? f : ~f;
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
    for (var c = Array(a.length), d = 0;d < a.length;d++) {
        c[d] = {index:d, value:a[d]};
    }
    var e = b || goog.array.defaultCompare;
    goog.array.sort(c, function(a, b) {
        return e(a.value, b.value) || a.index - b.index;
    });
    for (d = 0;d < a.length;d++) {
        a[d] = c[d].value;
    }
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c));
    });
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b];
    }, c);
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1;d < a.length;d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) {
            return !1;
        }
    }
    return !0;
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
        return !1;
    }
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0;e < d;e++) {
        if (!c(a[e], b[e])) {
            return !1;
        }
    }
    return !0;
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
        var f = c(a[e], b[e]);
        if (0 != f) {
            return f;
        }
    }
    return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0;e < a.length;e++) {
        var f = a[e], g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
    }
    return d;
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e;
    });
    return d;
};
goog.array.range = function(a, b, c) {
    var d = [], e = 0, f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) {
        return [];
    }
    if (0 < c) {
        for (a = e;a < f;a += c) {
            d.push(a);
        }
    } else {
        for (a = e;a > f;a += c) {
            d.push(a);
        }
    }
    return d;
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0;d < b;d++) {
        c[d] = a;
    }
    return c;
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0;c < arguments.length;c++) {
        var d = arguments[c];
        if (goog.isArray(d)) {
            for (var e = 0;e < d.length;e += 8192) {
                for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0;g < f.length;g++) {
                    b.push(f[g]);
                }
            }
        } else {
            b.push(d);
        }
    }
    return b;
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a;
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
    if (!arguments.length) {
        return [];
    }
    for (var b = [], c = arguments[0].length, d = 1;d < arguments.length;d++) {
        arguments[d].length < c && (c = arguments[d].length);
    }
    for (d = 0;d < c;d++) {
        for (var e = [], f = 0;f < arguments.length;f++) {
            e.push(arguments[f][d]);
        }
        b.push(e);
    }
    return b;
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1;0 < d;d--) {
        var e = Math.floor(c() * (d + 1)), f = a[d];
        a[d] = a[e];
        a[e] = f;
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b]);
    });
    return c;
};
goog.array.concatMap = function(a, b, c) {
    return goog.array.concat.apply([], goog.array.map(a, b, c));
};
goog.object = {};
goog.object.is = function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
};
goog.object.forEach = function(a, b, c) {
    for (var d in a) {
        b.call(c, a[d], d, a);
    }
};
goog.object.filter = function(a, b, c) {
    var d = {}, e;
    for (e in a) {
        b.call(c, a[e], e, a) && (d[e] = a[e]);
    }
    return d;
};
goog.object.map = function(a, b, c) {
    var d = {}, e;
    for (e in a) {
        d[e] = b.call(c, a[e], e, a);
    }
    return d;
};
goog.object.some = function(a, b, c) {
    for (var d in a) {
        if (b.call(c, a[d], d, a)) {
            return !0;
        }
    }
    return !1;
};
goog.object.every = function(a, b, c) {
    for (var d in a) {
        if (!b.call(c, a[d], d, a)) {
            return !1;
        }
    }
    return !0;
};
goog.object.getCount = function(a) {
    var b = 0, c;
    for (c in a) {
        b++;
    }
    return b;
};
goog.object.getAnyKey = function(a) {
    for (var b in a) {
        return b;
    }
};
goog.object.getAnyValue = function(a) {
    for (var b in a) {
        return a[b];
    }
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
    var b = [], c = 0, d;
    for (d in a) {
        b[c++] = a[d];
    }
    return b;
};
goog.object.getKeys = function(a) {
    var b = [], c = 0, d;
    for (d in a) {
        b[c++] = d;
    }
    return b;
};
goog.object.getValueByKeys = function(a, b) {
    for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], goog.isDef(a));c++) {
    }
    return a;
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a;
};
goog.object.containsValue = function(a, b) {
    for (var c in a) {
        if (a[c] == b) {
            return !0;
        }
    }
    return !1;
};
goog.object.findKey = function(a, b, c) {
    for (var d in a) {
        if (b.call(c, a[d], d, a)) {
            return d;
        }
    }
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
    for (var b in a) {
        return !1;
    }
    return !0;
};
goog.object.clear = function(a) {
    for (var b in a) {
        delete a[b];
    }
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c;
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) {
        throw Error('The object already contains the key "' + b + '"');
    }
    goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
    a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) {
        return a[b];
    }
    c = c();
    return a[b] = c;
};
goog.object.equals = function(a, b) {
    for (var c in a) {
        if (!(c in b) || a[c] !== b[c]) {
            return !1;
        }
    }
    for (c in b) {
        if (!(c in a)) {
            return !1;
        }
    }
    return !0;
};
goog.object.clone = function(a) {
    var b = {}, c;
    for (c in a) {
        b[c] = a[c];
    }
    return b;
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) {
            return a.clone();
        }
        var b = "array" == b ? [] : {}, c;
        for (c in a) {
            b[c] = goog.object.unsafeClone(a[c]);
        }
        return b;
    }
    return a;
};
goog.object.transpose = function(a) {
    var b = {}, c;
    for (c in a) {
        b[a[c]] = c;
    }
    return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1;e < arguments.length;e++) {
        d = arguments[e];
        for (c in d) {
            a[c] = d[c];
        }
        for (var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
            c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) {
        return goog.object.create.apply(null, arguments[0]);
    }
    if (b % 2) {
        throw Error("Uneven number of arguments");
    }
    for (var c = {}, d = 0;d < b;d += 2) {
        c[arguments[d]] = arguments[d + 1];
    }
    return c;
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) {
        return goog.object.createSet.apply(null, arguments[0]);
    }
    for (var c = {}, d = 0;d < b;d++) {
        c[arguments[d]] = !0;
    }
    return c;
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b;
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a);
};
goog.proto2 = {};
goog.proto2.Descriptor = function(a, b, c) {
    this.messageType_ = a;
    this.name_ = b.name || null;
    this.fullName_ = b.fullName || null;
    this.containingType_ = b.containingType;
    this.fields_ = {};
    for (a = 0;a < c.length;a++) {
        b = c[a], this.fields_[b.getTag()] = b;
    }
};
goog.proto2.Descriptor.prototype.getName = function() {
    return this.name_;
};
goog.proto2.Descriptor.prototype.getFullName = function() {
    return this.fullName_;
};
goog.proto2.Descriptor.prototype.getContainingType = function() {
    return this.containingType_ ? this.containingType_.getDescriptor() : null;
};
goog.proto2.Descriptor.prototype.getFields = function() {
    var a = goog.object.getValues(this.fields_);
    goog.array.sort(a, function(a, c) {
        return a.getTag() - c.getTag();
    });
    return a;
};
goog.proto2.Descriptor.prototype.getFieldsMap = function() {
    return this.fields_;
};
goog.proto2.Descriptor.prototype.findFieldByName = function(a) {
    return goog.object.findValue(this.fields_, function(b, c, d) {
        return b.getName() == a;
    }) || null;
};
goog.proto2.Descriptor.prototype.findFieldByTag = function(a) {
    goog.asserts.assert(goog.string.isNumeric(a));
    return this.fields_[parseInt(a, 10)] || null;
};
goog.proto2.Descriptor.prototype.createMessageInstance = function() {
    return new this.messageType_;
};
goog.proto2.FieldDescriptor = function(a, b, c) {
    this.parent_ = a;
    goog.asserts.assert(goog.string.isNumeric(b));
    this.tag_ = b;
    this.name_ = c.name;
    this.isPacked_ = !!c.packed;
    this.isRepeated_ = !!c.repeated;
    this.isRequired_ = !!c.required;
    this.fieldType_ = c.fieldType;
    this.nativeType_ = c.type;
    this.deserializationConversionPermitted_ = !1;
    switch(this.fieldType_) {
        case goog.proto2.FieldDescriptor.FieldType.INT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.UINT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.FIXED64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.SFIXED64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.SINT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.FLOAT:
            ;
        case goog.proto2.FieldDescriptor.FieldType.DOUBLE:
            this.deserializationConversionPermitted_ = !0;
    }
    this.defaultValue_ = c.defaultValue;
};
goog.proto2.FieldDescriptor.FieldType = {DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18};
goog.proto2.FieldDescriptor.prototype.getTag = function() {
    return this.tag_;
};
goog.proto2.FieldDescriptor.prototype.getContainingType = function() {
    return this.parent_.prototype.getDescriptor();
};
goog.proto2.FieldDescriptor.prototype.getName = function() {
    return this.name_;
};
goog.proto2.FieldDescriptor.prototype.getDefaultValue = function() {
    if (void 0 === this.defaultValue_) {
        var a = this.nativeType_;
        if (a === Boolean) {
            this.defaultValue_ = !1;
        } else {
            if (a === Number) {
                this.defaultValue_ = 0;
            } else {
                if (a === String) {
                    this.defaultValue_ = this.deserializationConversionPermitted_ ? "0" : "";
                } else {
                    return new a;
                }
            }
        }
    }
    return this.defaultValue_;
};
goog.proto2.FieldDescriptor.prototype.getFieldType = function() {
    return this.fieldType_;
};
goog.proto2.FieldDescriptor.prototype.getNativeType = function() {
    return this.nativeType_;
};
goog.proto2.FieldDescriptor.prototype.deserializationConversionPermitted = function() {
    return this.deserializationConversionPermitted_;
};
goog.proto2.FieldDescriptor.prototype.getFieldMessageType = function() {
    return this.nativeType_.prototype.getDescriptor();
};
goog.proto2.FieldDescriptor.prototype.isCompositeType = function() {
    return this.fieldType_ == goog.proto2.FieldDescriptor.FieldType.MESSAGE || this.fieldType_ == goog.proto2.FieldDescriptor.FieldType.GROUP;
};
goog.proto2.FieldDescriptor.prototype.isPacked = function() {
    return this.isPacked_;
};
goog.proto2.FieldDescriptor.prototype.isRepeated = function() {
    return this.isRepeated_;
};
goog.proto2.FieldDescriptor.prototype.isRequired = function() {
    return this.isRequired_;
};
goog.proto2.FieldDescriptor.prototype.isOptional = function() {
    return !this.isRepeated_ && !this.isRequired_;
};
goog.proto2.Message = function() {
    this.values_ = {};
    this.fields_ = this.getDescriptor().getFieldsMap();
    this.deserializedFields_ = this.lazyDeserializer_ = null;
};
goog.proto2.Message.FieldType = {DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18};
goog.proto2.Message.prototype.initializeForLazyDeserializer = function(a, b) {
    this.lazyDeserializer_ = a;
    this.values_ = b;
    this.deserializedFields_ = {};
};
goog.proto2.Message.prototype.setUnknown = function(a, b) {
    goog.asserts.assert(!this.fields_[a], "Field is not unknown in this message");
    goog.asserts.assert(1 <= a, "Tag " + a + ' has value "' + b + '" in descriptor ' + this.getDescriptor().getName());
    goog.asserts.assert(null !== b, "Value cannot be null");
    this.values_[a] = b;
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.prototype.forEachUnknown = function(a, b) {
    var c = b || this, d;
    for (d in this.values_) {
        var e = Number(d);
        this.fields_[e] || a.call(c, e, this.values_[d]);
    }
};
goog.proto2.Message.prototype.getDescriptor = goog.abstractMethod;
goog.proto2.Message.prototype.has = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.has$Value(a.getTag());
};
goog.proto2.Message.prototype.arrayOf = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.array$Values(a.getTag());
};
goog.proto2.Message.prototype.countOf = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.count$Values(a.getTag());
};
goog.proto2.Message.prototype.get = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.get$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.getOrDefault = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.get$ValueOrDefault(a.getTag(), b);
};
goog.proto2.Message.prototype.set = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.set$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.add = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.add$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.clear = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.clear$Field(a.getTag());
};
goog.proto2.Message.prototype.equals = function(a) {
    if (!a || this.constructor != a.constructor) {
        return !1;
    }
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag();
        if (this.has$Value(e) != a.has$Value(e)) {
            return !1;
        }
        if (this.has$Value(e)) {
            var f = d.isCompositeType(), g = this.getValueForTag_(e), e = a.getValueForTag_(e);
            if (d.isRepeated()) {
                if (g.length != e.length) {
                    return !1;
                }
                for (d = 0;d < g.length;d++) {
                    var h = g[d], k = e[d];
                    if (f ? !h.equals(k) : h != k) {
                        return !1;
                    }
                }
            } else {
                if (f ? !g.equals(e) : g != e) {
                    return !1;
                }
            }
        }
    }
    return !0;
};
goog.proto2.Message.prototype.copyFrom = function(a) {
    goog.asserts.assert(this.constructor == a.constructor, "The source message must have the same type.");
    this != a && (this.values_ = {}, this.deserializedFields_ && (this.deserializedFields_ = {}), this.mergeFrom(a));
};
goog.proto2.Message.prototype.mergeFrom = function(a) {
    goog.asserts.assert(this.constructor == a.constructor, "The source message must have the same type.");
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag();
        if (a.has$Value(e)) {
            this.deserializedFields_ && delete this.deserializedFields_[d.getTag()];
            var f = d.isCompositeType();
            if (d.isRepeated()) {
                for (var d = a.array$Values(e), g = 0;g < d.length;g++) {
                    this.add$Value(e, f ? d[g].clone() : d[g]);
                }
            } else {
                d = a.getValueForTag_(e), f ? (f = this.getValueForTag_(e)) ? f.mergeFrom(d) : this.set$Value(e, d.clone()) : this.set$Value(e, d);
            }
        }
    }
};
goog.proto2.Message.prototype.clone = function() {
    var a = new this.constructor;
    a.copyFrom(this);
    return a;
};
goog.proto2.Message.prototype.initDefaults = function(a) {
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag(), f = d.isCompositeType();
        this.has$Value(e) || d.isRepeated() || (f ? this.values_[e] = new (d.getNativeType()) : a && (this.values_[e] = d.getDefaultValue()));
        if (f) {
            if (d.isRepeated()) {
                for (d = this.array$Values(e), e = 0;e < d.length;e++) {
                    d[e].initDefaults(a);
                }
            } else {
                this.get$Value(e).initDefaults(a);
            }
        }
    }
};
goog.proto2.Message.prototype.has$Value = function(a) {
    return null != this.values_[a];
};
goog.proto2.Message.prototype.getValueForTag_ = function(a) {
    var b = this.values_[a];
    return goog.isDefAndNotNull(b) ? this.lazyDeserializer_ ? a in this.deserializedFields_ ? this.deserializedFields_[a] : (b = this.lazyDeserializer_.deserializeField(this, this.fields_[a], b), this.deserializedFields_[a] = b) : b : null;
};
goog.proto2.Message.prototype.get$Value = function(a, b) {
    var c = this.getValueForTag_(a);
    if (this.fields_[a].isRepeated()) {
        var d = b || 0;
        goog.asserts.assert(0 <= d && d < c.length, "Given index %s is out of bounds.  Repeated field length: %s", d, c.length);
        return c[d];
    }
    return c;
};
goog.proto2.Message.prototype.get$ValueOrDefault = function(a, b) {
    return this.has$Value(a) ? this.get$Value(a, b) : this.fields_[a].getDefaultValue();
};
goog.proto2.Message.prototype.array$Values = function(a) {
    return this.getValueForTag_(a) || [];
};
goog.proto2.Message.prototype.count$Values = function(a) {
    return this.fields_[a].isRepeated() ? this.has$Value(a) ? this.values_[a].length : 0 : this.has$Value(a) ? 1 : 0;
};
goog.proto2.Message.prototype.set$Value = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && this.checkFieldType_(this.fields_[a], b);
    this.values_[a] = b;
    this.deserializedFields_ && (this.deserializedFields_[a] = b);
};
goog.proto2.Message.prototype.add$Value = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && this.checkFieldType_(this.fields_[a], b);
    this.values_[a] || (this.values_[a] = []);
    this.values_[a].push(b);
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.prototype.checkFieldType_ = function(a, b) {
    a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.ENUM ? goog.asserts.assertNumber(b) : goog.asserts.assert(Object(b).constructor == a.getNativeType());
};
goog.proto2.Message.prototype.clear$Field = function(a) {
    delete this.values_[a];
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.createDescriptor = function(a, b) {
    var c = [], d = b[0], e;
    for (e in b) {
        0 != e && c.push(new goog.proto2.FieldDescriptor(a, e, b[e]));
    }
    return new goog.proto2.Descriptor(a, d, c);
};
goog.proto2.Serializer = function() {
};
goog.proto2.Serializer.DECODE_SYMBOLIC_ENUMS = !1;
goog.proto2.Serializer.prototype.serialize = goog.abstractMethod;
goog.proto2.Serializer.prototype.getSerializedValue = function(a, b) {
    return a.isCompositeType() ? this.serialize(b) : goog.isNumber(b) && !isFinite(b) ? b.toString() : b;
};
goog.proto2.Serializer.prototype.deserialize = function(a, b) {
    var c = a.createMessageInstance();
    this.deserializeTo(c, b);
    goog.asserts.assert(c instanceof goog.proto2.Message);
    return c;
};
goog.proto2.Serializer.prototype.deserializeTo = goog.abstractMethod;
goog.proto2.Serializer.prototype.getDeserializedValue = function(a, b) {
    if (a.isCompositeType()) {
        return b instanceof goog.proto2.Message ? b : this.deserialize(a.getFieldMessageType(), b);
    }
    if (a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.ENUM) {
        if (goog.proto2.Serializer.DECODE_SYMBOLIC_ENUMS && goog.isString(b)) {
            var c = a.getNativeType();
            if (c.hasOwnProperty(b)) {
                return c[b];
            }
        }
        return goog.isString(b) && goog.proto2.Serializer.INTEGER_REGEX.test(b) && (c = Number(b), 0 < c) ? c : b;
    }
    if (!a.deserializationConversionPermitted()) {
        return b;
    }
    c = a.getNativeType();
    if (c === String) {
        if (goog.isNumber(b)) {
            return String(b);
        }
    } else {
        if (c === Number && goog.isString(b) && ("Infinity" === b || "-Infinity" === b || "NaN" === b || goog.proto2.Serializer.INTEGER_REGEX.test(b))) {
            return Number(b);
        }
    }
    return b;
};
goog.proto2.Serializer.INTEGER_REGEX = /^-?[0-9]+$/;
goog.proto2.LazyDeserializer = function() {
};
goog.inherits(goog.proto2.LazyDeserializer, goog.proto2.Serializer);
goog.proto2.LazyDeserializer.prototype.deserialize = function(a, b) {
    var c = a.createMessageInstance();
    c.initializeForLazyDeserializer(this, b);
    goog.asserts.assert(c instanceof goog.proto2.Message);
    return c;
};
goog.proto2.LazyDeserializer.prototype.deserializeTo = function(a, b) {
    throw Error("Unimplemented");
};
goog.proto2.LazyDeserializer.prototype.deserializeField = goog.abstractMethod;
goog.proto2.PbLiteSerializer = function() {
};
goog.inherits(goog.proto2.PbLiteSerializer, goog.proto2.LazyDeserializer);
goog.proto2.PbLiteSerializer.prototype.zeroIndexing_ = !1;
goog.proto2.PbLiteSerializer.prototype.setZeroIndexed = function(a) {
    this.zeroIndexing_ = a;
};
goog.proto2.PbLiteSerializer.prototype.serialize = function(a) {
    for (var b = a.getDescriptor().getFields(), c = [], d = this.zeroIndexing_, e = 0;e < b.length;e++) {
        var f = b[e];
        if (a.has(f)) {
            var g = f.getTag(), g = d ? g - 1 : g;
            if (f.isRepeated()) {
                c[g] = [];
                for (var h = 0;h < a.countOf(f);h++) {
                    c[g][h] = this.getSerializedValue(f, a.get(f, h));
                }
            } else {
                c[g] = this.getSerializedValue(f, a.get(f));
            }
        }
    }
    a.forEachUnknown(function(a, b) {
        c[d ? a - 1 : a] = b;
    });
    return c;
};
goog.proto2.PbLiteSerializer.prototype.deserializeField = function(a, b, c) {
    if (null == c) {
        return c;
    }
    if (b.isRepeated()) {
        a = [];
        goog.asserts.assert(goog.isArray(c), "Value must be array: %s", c);
        for (var d = 0;d < c.length;d++) {
            a[d] = this.getDeserializedValue(b, c[d]);
        }
        return a;
    }
    return this.getDeserializedValue(b, c);
};
goog.proto2.PbLiteSerializer.prototype.getSerializedValue = function(a, b) {
    return a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.BOOL ? b ? 1 : 0 : goog.proto2.Serializer.prototype.getSerializedValue.apply(this, arguments);
};
goog.proto2.PbLiteSerializer.prototype.getDeserializedValue = function(a, b) {
    return a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.BOOL ? (goog.asserts.assert(goog.isNumber(b) || goog.isBoolean(b), "Value is expected to be a number or boolean"), !!b) : goog.proto2.Serializer.prototype.getDeserializedValue.apply(this, arguments);
};
goog.proto2.PbLiteSerializer.prototype.deserialize = function(a, b) {
    var c = b;
    if (this.zeroIndexing_) {
        var c = [], d;
        for (d in b) {
            c[parseInt(d, 10) + 1] = b[d];
        }
    }
    return goog.proto2.PbLiteSerializer.superClass_.deserialize.call(this, a, c);
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments);
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a;
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += String(a);
    if (null != b) {
        for (var d = 1;d < arguments.length;d++) {
            this.buffer_ += arguments[d];
        }
    }
    return this;
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = "";
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length;
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_;
};
/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/*第一替代开始
phonemetadata.pb.js
*/
var i18n = {phonenumbers:{}};
i18n.phonenumbers.NumberFormat = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.NumberFormat, goog.proto2.Message);
i18n.phonenumbers.NumberFormat.descriptor_ = null;
i18n.phonenumbers.NumberFormat.prototype.clone;
i18n.phonenumbers.NumberFormat.prototype.getPattern = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.NumberFormat.prototype.getPatternOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.NumberFormat.prototype.setPattern = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasPattern = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.NumberFormat.prototype.patternCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.NumberFormat.prototype.clearPattern = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.NumberFormat.prototype.getFormat = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.NumberFormat.prototype.getFormatOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.NumberFormat.prototype.setFormat = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasFormat = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.NumberFormat.prototype.formatCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.NumberFormat.prototype.clearFormat = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.NumberFormat.prototype.getLeadingDigitsPattern = function(index) {
    return   (this.get$Value(3, index));
};
i18n.phonenumbers.NumberFormat.prototype.getLeadingDigitsPatternOrDefault = function(index) {
    return   (this.get$ValueOrDefault(3, index));
};
i18n.phonenumbers.NumberFormat.prototype.addLeadingDigitsPattern = function(value) {
    this.add$Value(3, value);
};
i18n.phonenumbers.NumberFormat.prototype.leadingDigitsPatternArray = function() {
    return   (this.array$Values(3));
};
i18n.phonenumbers.NumberFormat.prototype.hasLeadingDigitsPattern = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.NumberFormat.prototype.leadingDigitsPatternCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.NumberFormat.prototype.clearLeadingDigitsPattern = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixFormattingRule = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixFormattingRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.NumberFormat.prototype.setNationalPrefixFormattingRule = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasNationalPrefixFormattingRule = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.NumberFormat.prototype.nationalPrefixFormattingRuleCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.NumberFormat.prototype.clearNationalPrefixFormattingRule = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixOptionalWhenFormatting = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixOptionalWhenFormattingOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.NumberFormat.prototype.setNationalPrefixOptionalWhenFormatting = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasNationalPrefixOptionalWhenFormatting = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.NumberFormat.prototype.nationalPrefixOptionalWhenFormattingCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.NumberFormat.prototype.clearNationalPrefixOptionalWhenFormatting = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.NumberFormat.prototype.getDomesticCarrierCodeFormattingRule = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.NumberFormat.prototype.getDomesticCarrierCodeFormattingRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.NumberFormat.prototype.setDomesticCarrierCodeFormattingRule = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasDomesticCarrierCodeFormattingRule = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.NumberFormat.prototype.domesticCarrierCodeFormattingRuleCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.NumberFormat.prototype.clearDomesticCarrierCodeFormattingRule = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneNumberDesc = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneNumberDesc, goog.proto2.Message);
i18n.phonenumbers.PhoneNumberDesc.descriptor_ = null;
i18n.phonenumbers.PhoneNumberDesc.prototype.clone;
i18n.phonenumbers.PhoneNumberDesc.prototype.getNationalNumberPattern = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getNationalNumberPatternOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.setNationalNumberPattern = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasNationalNumberPattern = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.nationalNumberPatternCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearNationalNumberPattern = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLength = function(index) {
    return   (this.get$Value(9, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthOrDefault = function(index) {
    return   (this.get$ValueOrDefault(9, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.addPossibleLength = function(value) {
    this.add$Value(9, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthArray = function() {
    return   (this.array$Values(9));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasPossibleLength = function() {
    return this.has$Value(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthCount = function() {
    return this.count$Values(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearPossibleLength = function() {
    this.clear$Field(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthLocalOnly = function(index) {
    return   (this.get$Value(10, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthLocalOnlyOrDefault = function(index) {
    return   (this.get$ValueOrDefault(10, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.addPossibleLengthLocalOnly = function(value) {
    this.add$Value(10, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthLocalOnlyArray = function() {
    return   (this.array$Values(10));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasPossibleLengthLocalOnly = function() {
    return this.has$Value(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthLocalOnlyCount = function() {
    return this.count$Values(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearPossibleLengthLocalOnly = function() {
    this.clear$Field(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getExampleNumber = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getExampleNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.setExampleNumber = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasExampleNumber = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.exampleNumberCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearExampleNumber = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneMetadata = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneMetadata, goog.proto2.Message);
i18n.phonenumbers.PhoneMetadata.descriptor_ = null;
i18n.phonenumbers.PhoneMetadata.prototype.clone;
i18n.phonenumbers.PhoneMetadata.prototype.getGeneralDesc = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.PhoneMetadata.prototype.getGeneralDescOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.PhoneMetadata.prototype.setGeneralDesc = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasGeneralDesc = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.generalDescCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearGeneralDesc = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.getFixedLine = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneMetadata.prototype.getFixedLineOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneMetadata.prototype.setFixedLine = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasFixedLine = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.fixedLineCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearFixedLine = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.getMobile = function() {
    return   (this.get$Value(3));
};
i18n.phonenumbers.PhoneMetadata.prototype.getMobileOrDefault = function() {
    return   (this.get$ValueOrDefault(3));
};
i18n.phonenumbers.PhoneMetadata.prototype.setMobile = function(value) {
    this.set$Value(3, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasMobile = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.mobileCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearMobile = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.getTollFree = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.PhoneMetadata.prototype.getTollFreeOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.PhoneMetadata.prototype.setTollFree = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasTollFree = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.tollFreeCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearTollFree = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPremiumRate = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPremiumRateOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPremiumRate = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPremiumRate = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.premiumRateCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPremiumRate = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSharedCost = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSharedCostOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSharedCost = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSharedCost = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.sharedCostCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSharedCost = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPersonalNumber = function() {
    return   (this.get$Value(7));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPersonalNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(7));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPersonalNumber = function(value) {
    this.set$Value(7, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPersonalNumber = function() {
    return this.has$Value(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.personalNumberCount = function() {
    return this.count$Values(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPersonalNumber = function() {
    this.clear$Field(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoip = function() {
    return   (this.get$Value(8));
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoipOrDefault = function() {
    return   (this.get$ValueOrDefault(8));
};
i18n.phonenumbers.PhoneMetadata.prototype.setVoip = function(value) {
    this.set$Value(8, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasVoip = function() {
    return this.has$Value(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.voipCount = function() {
    return this.count$Values(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearVoip = function() {
    this.clear$Field(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPager = function() {
    return   (this.get$Value(21));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPagerOrDefault = function() {
    return   (this.get$ValueOrDefault(21));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPager = function(value) {
    this.set$Value(21, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPager = function() {
    return this.has$Value(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.pagerCount = function() {
    return this.count$Values(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPager = function() {
    this.clear$Field(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.getUan = function() {
    return   (this.get$Value(25));
};
i18n.phonenumbers.PhoneMetadata.prototype.getUanOrDefault = function() {
    return   (this.get$ValueOrDefault(25));
};
i18n.phonenumbers.PhoneMetadata.prototype.setUan = function(value) {
    this.set$Value(25, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasUan = function() {
    return this.has$Value(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.uanCount = function() {
    return this.count$Values(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearUan = function() {
    this.clear$Field(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.getEmergency = function() {
    return   (this.get$Value(27));
};
i18n.phonenumbers.PhoneMetadata.prototype.getEmergencyOrDefault = function() {
    return   (this.get$ValueOrDefault(27));
};
i18n.phonenumbers.PhoneMetadata.prototype.setEmergency = function(value) {
    this.set$Value(27, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasEmergency = function() {
    return this.has$Value(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.emergencyCount = function() {
    return this.count$Values(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearEmergency = function() {
    this.clear$Field(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoicemail = function() {
    return   (this.get$Value(28));
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoicemailOrDefault = function() {
    return   (this.get$ValueOrDefault(28));
};
i18n.phonenumbers.PhoneMetadata.prototype.setVoicemail = function(value) {
    this.set$Value(28, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasVoicemail = function() {
    return this.has$Value(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.voicemailCount = function() {
    return this.count$Values(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearVoicemail = function() {
    this.clear$Field(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.getShortCode = function() {
    return   (this.get$Value(29));
};
i18n.phonenumbers.PhoneMetadata.prototype.getShortCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(29));
};
i18n.phonenumbers.PhoneMetadata.prototype.setShortCode = function(value) {
    this.set$Value(29, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasShortCode = function() {
    return this.has$Value(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.shortCodeCount = function() {
    return this.count$Values(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearShortCode = function() {
    this.clear$Field(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.getStandardRate = function() {
    return   (this.get$Value(30));
};
i18n.phonenumbers.PhoneMetadata.prototype.getStandardRateOrDefault = function() {
    return   (this.get$ValueOrDefault(30));
};
i18n.phonenumbers.PhoneMetadata.prototype.setStandardRate = function(value) {
    this.set$Value(30, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasStandardRate = function() {
    return this.has$Value(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.standardRateCount = function() {
    return this.count$Values(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearStandardRate = function() {
    this.clear$Field(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.getCarrierSpecific = function() {
    return   (this.get$Value(31));
};
i18n.phonenumbers.PhoneMetadata.prototype.getCarrierSpecificOrDefault = function() {
    return   (this.get$ValueOrDefault(31));
};
i18n.phonenumbers.PhoneMetadata.prototype.setCarrierSpecific = function(value) {
    this.set$Value(31, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasCarrierSpecific = function() {
    return this.has$Value(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.carrierSpecificCount = function() {
    return this.count$Values(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearCarrierSpecific = function() {
    this.clear$Field(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSmsServices = function() {
    return   (this.get$Value(33));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSmsServicesOrDefault = function() {
    return   (this.get$ValueOrDefault(33));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSmsServices = function(value) {
    this.set$Value(33, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSmsServices = function() {
    return this.has$Value(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.smsServicesCount = function() {
    return this.count$Values(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSmsServices = function() {
    this.clear$Field(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNoInternationalDialling = function() {
    return   (this.get$Value(24));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNoInternationalDiallingOrDefault = function() {
    return   (this.get$ValueOrDefault(24));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNoInternationalDialling = function(value) {
    this.set$Value(24, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNoInternationalDialling = function() {
    return this.has$Value(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.noInternationalDiallingCount = function() {
    return this.count$Values(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNoInternationalDialling = function() {
    this.clear$Field(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.getId = function() {
    return   (this.get$Value(9));
};
i18n.phonenumbers.PhoneMetadata.prototype.getIdOrDefault = function() {
    return   (this.get$ValueOrDefault(9));
};
i18n.phonenumbers.PhoneMetadata.prototype.setId = function(value) {
    this.set$Value(9, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasId = function() {
    return this.has$Value(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.idCount = function() {
    return this.count$Values(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearId = function() {
    this.clear$Field(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.getCountryCode = function() {
    return   (this.get$Value(10));
};
i18n.phonenumbers.PhoneMetadata.prototype.getCountryCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(10));
};
i18n.phonenumbers.PhoneMetadata.prototype.setCountryCode = function(value) {
    this.set$Value(10, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasCountryCode = function() {
    return this.has$Value(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.countryCodeCount = function() {
    return this.count$Values(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearCountryCode = function() {
    this.clear$Field(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.getInternationalPrefix = function() {
    return   (this.get$Value(11));
};
i18n.phonenumbers.PhoneMetadata.prototype.getInternationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(11));
};
i18n.phonenumbers.PhoneMetadata.prototype.setInternationalPrefix = function(value) {
    this.set$Value(11, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasInternationalPrefix = function() {
    return this.has$Value(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.internationalPrefixCount = function() {
    return this.count$Values(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearInternationalPrefix = function() {
    this.clear$Field(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredInternationalPrefix = function() {
    return   (this.get$Value(17));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredInternationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(17));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPreferredInternationalPrefix = function(value) {
    this.set$Value(17, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPreferredInternationalPrefix = function() {
    return this.has$Value(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.preferredInternationalPrefixCount = function() {
    return this.count$Values(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPreferredInternationalPrefix = function() {
    this.clear$Field(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefix = function() {
    return   (this.get$Value(12));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(12));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefix = function(value) {
    this.set$Value(12, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefix = function() {
    return this.has$Value(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixCount = function() {
    return this.count$Values(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefix = function() {
    this.clear$Field(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredExtnPrefix = function() {
    return   (this.get$Value(13));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredExtnPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(13));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPreferredExtnPrefix = function(value) {
    this.set$Value(13, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPreferredExtnPrefix = function() {
    return this.has$Value(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.preferredExtnPrefixCount = function() {
    return this.count$Values(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPreferredExtnPrefix = function() {
    this.clear$Field(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixForParsing = function() {
    return   (this.get$Value(15));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixForParsingOrDefault = function() {
    return   (this.get$ValueOrDefault(15));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefixForParsing = function(value) {
    this.set$Value(15, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefixForParsing = function() {
    return this.has$Value(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixForParsingCount = function() {
    return this.count$Values(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefixForParsing = function() {
    this.clear$Field(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixTransformRule = function() {
    return   (this.get$Value(16));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixTransformRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(16));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefixTransformRule = function(value) {
    this.set$Value(16, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefixTransformRule = function() {
    return this.has$Value(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixTransformRuleCount = function() {
    return this.count$Values(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefixTransformRule = function() {
    this.clear$Field(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSameMobileAndFixedLinePattern = function() {
    return   (this.get$Value(18));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSameMobileAndFixedLinePatternOrDefault = function() {
    return   (this.get$ValueOrDefault(18));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSameMobileAndFixedLinePattern = function(value) {
    this.set$Value(18, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSameMobileAndFixedLinePattern = function() {
    return this.has$Value(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.sameMobileAndFixedLinePatternCount = function() {
    return this.count$Values(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSameMobileAndFixedLinePattern = function() {
    this.clear$Field(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNumberFormat = function(index) {
    return   (this.get$Value(19, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNumberFormatOrDefault = function(index) {
    return   (this.get$ValueOrDefault(19, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.addNumberFormat = function(value) {
    this.add$Value(19, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.numberFormatArray = function() {
    return   (this.array$Values(19));
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNumberFormat = function() {
    return this.has$Value(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.numberFormatCount = function() {
    return this.count$Values(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNumberFormat = function() {
    this.clear$Field(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.getIntlNumberFormat = function(index) {
    return   (this.get$Value(20, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.getIntlNumberFormatOrDefault = function(index) {
    return   (this.get$ValueOrDefault(20, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.addIntlNumberFormat = function(value) {
    this.add$Value(20, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.intlNumberFormatArray = function() {
    return   (this.array$Values(20));
};
i18n.phonenumbers.PhoneMetadata.prototype.hasIntlNumberFormat = function() {
    return this.has$Value(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.intlNumberFormatCount = function() {
    return this.count$Values(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearIntlNumberFormat = function() {
    this.clear$Field(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.getMainCountryForCode = function() {
    return   (this.get$Value(22));
};
i18n.phonenumbers.PhoneMetadata.prototype.getMainCountryForCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(22));
};
i18n.phonenumbers.PhoneMetadata.prototype.setMainCountryForCode = function(value) {
    this.set$Value(22, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasMainCountryForCode = function() {
    return this.has$Value(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.mainCountryForCodeCount = function() {
    return this.count$Values(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearMainCountryForCode = function() {
    this.clear$Field(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingDigits = function() {
    return   (this.get$Value(23));
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingDigitsOrDefault = function() {
    return   (this.get$ValueOrDefault(23));
};
i18n.phonenumbers.PhoneMetadata.prototype.setLeadingDigits = function(value) {
    this.set$Value(23, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasLeadingDigits = function() {
    return this.has$Value(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.leadingDigitsCount = function() {
    return this.count$Values(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearLeadingDigits = function() {
    this.clear$Field(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingZeroPossible = function() {
    return   (this.get$Value(26));
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingZeroPossibleOrDefault = function() {
    return   (this.get$ValueOrDefault(26));
};
i18n.phonenumbers.PhoneMetadata.prototype.setLeadingZeroPossible = function(value) {
    this.set$Value(26, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasLeadingZeroPossible = function() {
    return this.has$Value(26);
};
i18n.phonenumbers.PhoneMetadata.prototype.leadingZeroPossibleCount = function() {
    return this.count$Values(26);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearLeadingZeroPossible = function() {
    this.clear$Field(26);
};
i18n.phonenumbers.PhoneMetadataCollection = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneMetadataCollection, goog.proto2.Message);
i18n.phonenumbers.PhoneMetadataCollection.descriptor_ = null;
i18n.phonenumbers.PhoneMetadataCollection.prototype.clone;
i18n.phonenumbers.PhoneMetadataCollection.prototype.getMetadata = function(index) {
    return   (this.get$Value(1, index));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.getMetadataOrDefault = function(index) {
    return   (this.get$ValueOrDefault(1, index));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.addMetadata = function(value) {
    this.add$Value(1, value);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.metadataArray = function() {
    return   (this.array$Values(1));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.hasMetadata = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.metadataCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.clearMetadata = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.NumberFormat.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.NumberFormat.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'NumberFormat',
                fullName: 'i18n.phonenumbers.NumberFormat'
            },
            1: {
                name: 'pattern',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            2: {
                name: 'format',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            3: {
                name: 'leading_digits_pattern',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            4: {
                name: 'national_prefix_formatting_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            6: {
                name: 'national_prefix_optional_when_formatting',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            5: {
                name: 'domestic_carrier_code_formatting_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.NumberFormat.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.NumberFormat, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.NumberFormat.getDescriptor =
    i18n.phonenumbers.NumberFormat.prototype.getDescriptor;
i18n.phonenumbers.PhoneNumberDesc.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneNumberDesc.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneNumberDesc',
                fullName: 'i18n.phonenumbers.PhoneNumberDesc'
            },
            2: {
                name: 'national_number_pattern',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            9: {
                name: 'possible_length',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            10: {
                name: 'possible_length_local_only',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            6: {
                name: 'example_number',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.PhoneNumberDesc.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneNumberDesc, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneNumberDesc.getDescriptor =
    i18n.phonenumbers.PhoneNumberDesc.prototype.getDescriptor;
i18n.phonenumbers.PhoneMetadata.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneMetadata.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneMetadata',
                fullName: 'i18n.phonenumbers.PhoneMetadata'
            },
            1: {
                name: 'general_desc',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            2: {
                name: 'fixed_line',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            3: {
                name: 'mobile',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            4: {
                name: 'toll_free',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            5: {
                name: 'premium_rate',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            6: {
                name: 'shared_cost',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            7: {
                name: 'personal_number',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            8: {
                name: 'voip',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            21: {
                name: 'pager',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            25: {
                name: 'uan',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            27: {
                name: 'emergency',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            28: {
                name: 'voicemail',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            29: {
                name: 'short_code',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            30: {
                name: 'standard_rate',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            31: {
                name: 'carrier_specific',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            33: {
                name: 'sms_services',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            24: {
                name: 'no_international_dialling',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            9: {
                name: 'id',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            10: {
                name: 'country_code',
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            11: {
                name: 'international_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            17: {
                name: 'preferred_international_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            12: {
                name: 'national_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            13: {
                name: 'preferred_extn_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            15: {
                name: 'national_prefix_for_parsing',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            16: {
                name: 'national_prefix_transform_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            18: {
                name: 'same_mobile_and_fixed_line_pattern',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            19: {
                name: 'number_format',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.NumberFormat
            },
            20: {
                name: 'intl_number_format',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.NumberFormat
            },
            22: {
                name: 'main_country_for_code',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            23: {
                name: 'leading_digits',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            26: {
                name: 'leading_zero_possible',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            }
        };
        i18n.phonenumbers.PhoneMetadata.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneMetadata, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneMetadata.getDescriptor =
    i18n.phonenumbers.PhoneMetadata.prototype.getDescriptor;
i18n.phonenumbers.PhoneMetadataCollection.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneMetadataCollection.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneMetadataCollection',
                fullName: 'i18n.phonenumbers.PhoneMetadataCollection'
            },
            1: {
                name: 'metadata',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneMetadata
            }
        };
        i18n.phonenumbers.PhoneMetadataCollection.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneMetadataCollection, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneMetadataCollection.getDescriptor =
    i18n.phonenumbers.PhoneMetadataCollection.prototype.getDescriptor;
/*phonenumber.pb.js*/
i18n.phonenumbers.PhoneNumber = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneNumber, goog.proto2.Message);
i18n.phonenumbers.PhoneNumber.descriptor_ = null;
i18n.phonenumbers.PhoneNumber.prototype.clone;
i18n.phonenumbers.PhoneNumber.prototype.getCountryCode = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.PhoneNumber.prototype.setCountryCode = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasCountryCode = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneNumber.prototype.countryCodeCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneNumber.prototype.clearCountryCode = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.PhoneNumber.prototype.getNationalNumber = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneNumber.prototype.getNationalNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneNumber.prototype.setNationalNumber = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasNationalNumber = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneNumber.prototype.nationalNumberCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneNumber.prototype.clearNationalNumber = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneNumber.prototype.getExtension = function() {
    return   (this.get$Value(3));
};
i18n.phonenumbers.PhoneNumber.prototype.getExtensionOrDefault = function() {
    return   (this.get$ValueOrDefault(3));
};
i18n.phonenumbers.PhoneNumber.prototype.setExtension = function(value) {
    this.set$Value(3, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasExtension = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.PhoneNumber.prototype.extensionCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.PhoneNumber.prototype.clearExtension = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.PhoneNumber.prototype.getItalianLeadingZero = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.PhoneNumber.prototype.getItalianLeadingZeroOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.PhoneNumber.prototype.setItalianLeadingZero = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasItalianLeadingZero = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.PhoneNumber.prototype.italianLeadingZeroCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.PhoneNumber.prototype.clearItalianLeadingZero = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.PhoneNumber.prototype.getNumberOfLeadingZeros = function() {
    return   (this.get$Value(8));
};
i18n.phonenumbers.PhoneNumber.prototype.getNumberOfLeadingZerosOrDefault = function() {
    return   (this.get$ValueOrDefault(8));
};
i18n.phonenumbers.PhoneNumber.prototype.setNumberOfLeadingZeros = function(value) {
    this.set$Value(8, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasNumberOfLeadingZeros = function() {
    return this.has$Value(8);
};
i18n.phonenumbers.PhoneNumber.prototype.numberOfLeadingZerosCount = function() {
    return this.count$Values(8);
};
i18n.phonenumbers.PhoneNumber.prototype.clearNumberOfLeadingZeros = function() {
    this.clear$Field(8);
};
i18n.phonenumbers.PhoneNumber.prototype.getRawInput = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.PhoneNumber.prototype.getRawInputOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.PhoneNumber.prototype.setRawInput = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasRawInput = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.PhoneNumber.prototype.rawInputCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.PhoneNumber.prototype.clearRawInput = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeSource = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeSourceOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneNumber.prototype.setCountryCodeSource = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasCountryCodeSource = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneNumber.prototype.countryCodeSourceCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneNumber.prototype.clearCountryCodeSource = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneNumber.prototype.getPreferredDomesticCarrierCode = function() {
    return   (this.get$Value(7));
};
i18n.phonenumbers.PhoneNumber.prototype.getPreferredDomesticCarrierCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(7));
};
i18n.phonenumbers.PhoneNumber.prototype.setPreferredDomesticCarrierCode = function(value) {
    this.set$Value(7, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasPreferredDomesticCarrierCode = function() {
    return this.has$Value(7);
};
i18n.phonenumbers.PhoneNumber.prototype.preferredDomesticCarrierCodeCount = function() {
    return this.count$Values(7);
};
i18n.phonenumbers.PhoneNumber.prototype.clearPreferredDomesticCarrierCode = function() {
    this.clear$Field(7);
};
i18n.phonenumbers.PhoneNumber.CountryCodeSource = {
    UNSPECIFIED: 0,
    FROM_NUMBER_WITH_PLUS_SIGN: 1,
    FROM_NUMBER_WITH_IDD: 5,
    FROM_NUMBER_WITHOUT_PLUS_SIGN: 10,
    FROM_DEFAULT_COUNTRY: 20
};
i18n.phonenumbers.PhoneNumber.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneNumber.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneNumber',
                fullName: 'i18n.phonenumbers.PhoneNumber'
            },
            1: {
                name: 'country_code',
                required: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            2: {
                name: 'national_number',
                required: true,
                fieldType: goog.proto2.Message.FieldType.UINT64,
                type: Number
            },
            3: {
                name: 'extension',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            4: {
                name: 'italian_leading_zero',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                type: Boolean
            },
            8: {
                name: 'number_of_leading_zeros',
                fieldType: goog.proto2.Message.FieldType.INT32,
                defaultValue: 1,
                type: Number
            },
            5: {
                name: 'raw_input',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            6: {
                name: 'country_code_source',
                fieldType: goog.proto2.Message.FieldType.ENUM,
                defaultValue: i18n.phonenumbers.PhoneNumber.CountryCodeSource.UNSPECIFIED,
                type: i18n.phonenumbers.PhoneNumber.CountryCodeSource
            },
            7: {
                name: 'preferred_domestic_carrier_code',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.PhoneNumber.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneNumber, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneNumber['ctor'] = i18n.phonenumbers.PhoneNumber;
i18n.phonenumbers.PhoneNumber['ctor'].getDescriptor =
    i18n.phonenumbers.PhoneNumber.prototype.getDescriptor;
/*phonenumber.pb.js*/
/*
metadata.js
*/
i18n.phonenumbers.metadata = {};
i18n.phonenumbers.metadata.countryCodeToRegionCodeMap = {1:["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]};

/**
 * A mapping from a region code to the PhoneMetadata for that region.
 * @type {!Object.<string, Array>}
 */
i18n.phonenumbers.metadata.countryToMetadata = {"AC":[,[,,"(?:[01589]\\d|[46])\\d{4}",,,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[01589]\\d{5}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],"AD":[,[,,"(?:1|6\\d)\\d{7}|[136-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"690\\d{6}|[36]\\d{5}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[136-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["1"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AE":[,[,,"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],[,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],"AF":[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",,,,"234567890",,,,[7]],[,,"7(?:[014-9]\\d|2[89]|3[01])\\d{6}",,,,"701234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AG":[,[,,"(?:268|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",,,,"2684641234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"1",,,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AI":[,[,,"(?:264|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"2644(?:6[12]|9[78])\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AL":[,[,,"(?:(?:[2-58]|6\\d)\\d\\d|700)\\d{5}|(?:8\\d{2,3}|900)\\d{3}",,,,,,,[6,7,8,9],[5]],[,,"(?:[2358](?:[16-9]\\d[2-9]|[2-5][2-9]\\d)|4(?:[2-57-9][2-9]|6\\d)\\d)\\d{4}",,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[689][2-9]|7[2-6])\\d{6}",,,,"662123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d\\d",,,,"900123",,,[6]],[,,"808[1-9]\\d\\d",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AM":[,[,,"(?:[1-489]\\d|55|60|77)\\d{6}",,,,,,,[8],[5,6]],[,,"(?:(?:1[0-2]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["[23]"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[4-7]|88|9[13-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]"],"0 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AO":[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}",,,,"222123456"],[,,"9[1-49]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AR":[,[,,"(?:11|(?:[2368]|9\\d)\\d)\\d{8}",,,,,,,[10,11],[6,7,8]],[,,"11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:[07]\\d|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|6[013-9])|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[012789]\\d|3[1-6]|4[02-9]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:0[0124-9]|[1-357]\\d|4[24-7]|6[02-9]|8[0-79]|9[1236-8])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[069]\\d|1[1568]|2[013-9]|3[145]|4[0-35-9]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[01578]\\d|2[15-7]|3[0-24-9]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",,,,"1123456789",,,[10],[6,7,8]],[,,"675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?","9$1",,,[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{2})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],"0$1"],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],"0$1"],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d{3})","$1",["1[0-2]|911"],"$1"]],[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(9)(11)(\\d{4})(\\d{4})","$1 $2 $3-$4",["911"]],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9[23]"]],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,,,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],"AS":[,[,,"(?:[58]\\d\\d|684|900)\\d{7}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AT":[,[,,"[1-35-9]\\d{8,12}|4(?:[0-24-9]\\d{4,11}|3(?:[05]\\d{3,10}|[2-467]\\d{3,4}|8\\d{3,6}|9\\d{3,7}))|[1-35-8]\\d{7}|[1-35-7]\\d{5,6}|[15]\\d{4}|1\\d{3}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"9(?:0[01]|3[019])\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|7[28]0\\d{6,10}",,,,"780123456",,,[5,6,7,8,9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(116\\d{3})","$1",["116"],"$1"],[,"(1)(\\d{3,12})","$1 $2",["1"],"0$1"],[,"(5\\d)(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["5[079]"],"0$1"],[,"(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:[28]0|32)|[89]"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:[24][1-8]|35|[5-79])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AU":[,[,,"1\\d{4,9}|(?:[2-478]\\d\\d|550)\\d{6}",,,,,,,[5,6,7,8,9,10]],[,,"[237]\\d{8}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|[6-8]\\d{4}|9(?:[02-9]\\d{3}|1(?:[0-57-9]\\d{2}|6[0135-9]\\d)))\\d{3}",,,,"212345678",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"AU",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011)|001[14-689]","0",,,"0",,"0011",,[[,"([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],[,"(16)(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[389]0","1(?:[38]0|9)0"]],[,"(180)(2\\d{3})","$1 $2",["180","1802"]],[,"(19\\d)(\\d{3})","$1 $2",["19[13]"]],[,"(19\\d{2})(\\d{4})","$1 $2",["19[679]"]],[,"(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"]]],,[,,"16\\d{3,7}",,,,"1612345",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))",,,,,,,[6,7,8,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AW":[,[,,"(?:[25-79]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:28\\d|501)\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AX":[,[,,"(?:(?:[1247]\\d|3[0-46-9]|[56]0)\\d\\d|800)\\d{4,6}|(?:[1-47]\\d|50)\\d{4,5}|2\\d{4}",,,,,,,[5,6,7,8,9,10]],[,,"18[1-8]\\d{3,6}",,,,"181234567",,,[6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})"],[,,"10\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|3[09]\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"10112345"],,,[,,,,,,,,,[-1]]],"AZ":[,[,,"(?:(?:(?:[12457]\\d|60|88)\\d|365)\\d{3}|900200)\\d{3}",,,,,,,[9],[7]],[,,"(?:(?:1[28]\\d|2(?:[045]2|1[24]|2[2-4]|33|6[23]))\\d\\d|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}",,,,"123123456",,,,[7]],[,,"(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BA":[,[,,"(?:[3589]\\d|49|6\\d\\d?|70)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,,[-1]]],"BB":[,[,,"(?:246|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"(?:246976|900[2-9]\\d\\d)\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],"BD":[,[,,"[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[01367]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8)|62\\d{2})|71\\d{2}|8(?:[18]|23|54)\\d{2}|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",,,,"27111234",,,[6,7,8,9]],[,,"(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-4]|3[389]|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(2)(\\d{7,8})","$1-$2",["2"],"0$1"],[,"(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[01367])"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BE":[,[,,"4\\d{8}|[1-9]\\d{7}",,,,,,,[8,9]],[,,"(?:(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|9[2-4])\\d|8(?:0[2-8]|[1-79]\\d))\\d{5}",,,,"12345678",,,[8]],[,,"4(?:5[56]|6[0135-8]|[79]\\d|8[3-9])\\d{6}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",,,,"90012345",,,[8]],[,,"7879\\d{4}",,,,"78791234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-7]|8(?:0[2-8]|[1-79])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78(?:0[57]|1[0458]|2[25]|3[5-8]|48|[56]0|7[078])\\d{4}",,,,"78102345",,,[8]],,,[,,,,,,,,,[-1]]],"BF":[,[,,"[25-7]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:5[124-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BG":[,[,,"[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",,,,,,,[6,7,8,9],[4,5]],[,,"(?:(?:[236]\\d|5[1-9]|8[1-6]|9[1-7])\\d|4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}|2\\d{5}",,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:4(?:3[07-9]|8\\d)|(?:8[7-9]\\d|9(?:8\\d|9[69]))\\d)\\d{5}",,,,"48123456",,,[8,9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["7|80"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BH":[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d\\d))\\d{4}",,,,"17001234"],[,,"(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}",,,,"36001234"],[,,"80\\d{6}",,,,"80123456"],[,,"(?:87|9[014578])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[1367]|8[047]|9[014578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BI":[,[,,"(?:[267]\\d|31)\\d{6}",,,,,,,[8]],[,,"22\\d{6}",,,,"22201234"],[,,"(?:29|31|6[189]|7[125-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|6[189]|7[125-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BJ":[,[,,"[2689]\\d{7}",,,,,,,[8]],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}",,,,"20211234"],[,,"(?:6\\d|9[03-9])\\d{6}",,,,"90011234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234"],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456"],,,[,,,,,,,,,[-1]]],"BL":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:2[7-9]|5[12]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BM":[,[,,"(?:441|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"441(?:2(?:02|23|[3479]\\d|61)|[46]\\d\\d|5(?:4\\d|60|89)|824)\\d{4}",,,,"4412345678",,,,[7]],[,,"441(?:[37]\\d|5[0-39])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BN":[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"(?:2(?:[013-9]\\d|2[0-7])|[3-5]\\d\\d)\\d{4}",,,,"2345678"],[,,"(?:22[89]|[78]\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BN",673,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BO":[,[,,"(?:[2-467]\\d{3}|80017)\\d{4}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"80017\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BO",591,"00(1\\d)?","0",,,"0(1\\d)?",,,,[[,"([234])(\\d{7})","$1 $2",["[2-4]"],,"0$CC $1"],[,"([67]\\d{7})","$1",["[67]"],,"0$CC $1"],[,"(800)(\\d{2})(\\d{4})","$1 $2 $3",["800"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BQ":[,[,,"(?:[34]1|7\\d)\\d{5}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"[347]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BR":[,[,,"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-9]|9\\d)\\d{7}",,,,"11961234567",,,[10,11],[8]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"(?:300|[59]00\\d?)\\d{6}",,,,"300123456",,,[9,10]],[,,"(?:300\\d(?:\\d{2})?|4(?:0(?:0\\d|20)|370))\\d{4}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,"(\\d{3,5})","$1",["1[125689]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:0[1-9]|[1-9])"]],[,"(\\d{5})(\\d{4})","$1-$2",["9(?:0[1-9]|[1-9])"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"(?:300\\d|40(?:0\\d|20))\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BS":[,[,,"(?:242|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",,,,"2423591234",,,,[7]],[,,"(?:242300|8(?:00|33|44|55|66|77|88)[2-9]\\d\\d)\\d{4}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225[0-46-9]\\d{3}",,,,"2422250123"],,,[,,,,,,,,,[-1]]],"BT":[,[,,"[17]\\d{7}|[2-8]\\d{6}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[23568]|4[5-7]|7[246]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BW":[,[,,"(?:(?:[2-6]|7\\d)\\d|90)\\d{5}",,,,,,,[7,8]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",,,,"2401234",,,[7]],[,,"7(?:[1-6]\\d|7[014-8])\\d{5}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79[12][01]\\d{4}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(\\d{2})(\\d{5})","$1 $2",["90"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BY":[,[,,"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}",,,,"294911911",,,[9]],[,,"8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"8?0?",,"8~10",,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])","1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],[,"(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],[,"(800)(\\d{3})","$1 $2",["800"],"8 $1"],[,"(800)(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BZ":[,[,,"(?:0800\\d|[2-8])\\d{6}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CA":[,[,,"(?:[2-8]\\d|90)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"5062345678",,,,[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"5062345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",,,,"5002345678"],[,,"600[2-9]\\d{6}",,,,"6002012345"],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CC":[,[,,"1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:08|22|68)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"CC",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CD":[,[,,"[189]\\d{8}|[1-68]\\d{6}",,,,,,,[7,9]],[,,"12\\d{7}|[1-6]\\d{6}",,,,"1234567"],[,,"(?:8(?:[0-2459]\\d\\d|8)|9[017-9]\\d\\d)\\d{5}",,,,"991234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CF":[,[,,"(?:[27]\\d{3}|8776)\\d{4}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[0257]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CG":[,[,,"(?:(?:0\\d|80)\\d|222)\\d{6}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"0[14-6]\\d{7}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80(?:0\\d\\d|11[0-4])\\d{4}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CH":[,[,,"8\\d{11}|[2-9]\\d{8}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"7[35-9]\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]|[89]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],"CI":[,[,,"[02-8]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",,,,"21234567"],[,,"(?:[07][1-9]|[45]\\d|6[014-9]|8[4-9])\\d{6}",,,,"01234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CK":[,[,,"[2-8]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[5-8]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CL":[,[,,"(?:1230|[2-57-9]\\d|6\\d{1,3})\\d{7}",,,,,,,[9,10,11]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[2-9]\\d)\\d{6}",,,,"221234567",,,[9]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[2-9]\\d)\\d{6}",,,,"961234567",,,[9]],[,,"800\\d{6}|1230\\d{7}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["600"]],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"],[,"(\\d{4,5})","$1",["[1-9]"],"$1"]],[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["600"]],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,,,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CM":[,[,,"(?:[26]\\d\\d|88)\\d{6}",,,,,,,[8,9]],[,,"2(?:22|33|4[23])\\d{6}",,,,"222123456",,,[9]],[,,"6[5-9]\\d{7}",,,,"671234567",,,[9]],[,,"88\\d{6}",,,,"88012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CN":[,[,,"(?:(?:(?:1[03-68]|2\\d)\\d\\d|[3-79])\\d|8[0-57-9])\\d{7}|[1-579]\\d{10}|8[0-57-9]\\d{8,9}|[1-79]\\d{9}|[1-9]\\d{7}|[12]\\d{6}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})",,,,"1012345678",,,,[5,6]],[,,"1(?:[38]\\d{3}|4[57]\\d{2}|5[0-35-9]\\d{2}|66\\d{2}|7(?:[0-35-8]\\d{2}|40[0-5])|9[89]\\d{2})\\d{6}",,,,"13123456789",,,[11]],[,,"(?:10)?800\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"(?:1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))?00","0",,,"0|(1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))",,"00",,[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{5,6})","$1",["100|95"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(\\d{3,4})(\\d{4})","$1 $2",["[2-9]"]],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[,,,,,,,,,[-1]],,,[,,"(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}",,,,,,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CO":[,[,,"(?:1\\d|3)\\d{9}|[124-8]\\d{7}",,,,,,,[8,10,11],[7]],[,,"[124-8][2-9]\\d{6}",,,,"12345678",,,[8],[7]],[,,"3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"19(?:0[01]|4[78])\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:44|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1 $2 $3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CR":[,[,,"(?:8\\d|90)\\d{8}|[24-8]\\d{7}",,,,,,,[8,10]],[,,"2(?:[024-7]\\d{2}|1(?:0[7-9]|[1-9]\\d))\\d{4}",,,,"22123456",,,[8]],[,,"5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"210[0-6]\\d{4}|4\\d{7}|5100\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[012468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]0"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CU":[,[,,"[2-57]\\d{7}|[2-47]\\d{6}|[34]\\d{5}",,,,,,,[6,7,8],[4,5]],[,,"2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}",,,,"71234567",,,,[4,5]],[,,"5\\d{7}",,,,"51234567",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CV":[,[,,"[2-59]\\d{6}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:[34][36]|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-59]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CW":[,[,,"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",,,,,,,[7,8]],[,,"9(?:(?:[48]\\d|50)\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}",,,,"94151234"],[,,"9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}",,,,"95181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[3467]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,"[69]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CX":[,[,,"1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:21|49|78|81)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"CX",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CY":[,[,,"(?:[279]\\d|[58]0)\\d{6}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9[4-79]\\d{6}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],"CZ":[,[,,"(?:[2-578]\\d|60|9\\d{1,4})\\d{7}",,,,,,,[9,10,11,12]],[,,"(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[2-4])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],"DE":[,[,,"(?:1|[358]\\d{11})\\d{3}|[1-35689]\\d{13}|4(?:[0-8]\\d{5,12}|9(?:[05]\\d|44|6[1-8])\\d{9})|[1-35-9]\\d{6,12}|49(?:[0-357]\\d|[46][1-8])\\d{4,8}|49(?:[0-3579]\\d|4[1-9]|6[0-8])\\d{3}|[1-9]\\d{5}|[13-68]\\d{4}",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[3]],[,,"2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|[1-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})",,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[3,4]],[,,"1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})",,,,"9001234567",,,[10,11]],[,,"1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(15\\d{3})(\\d{6})","$1 $2",["15[0568]"],"0$1"],[,"(1\\d{3})(\\d{7})","$1 $2",["15"],"0$1"],[,"(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,11})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)","2(?:0[1-389]|1(?:[14]|2[0-8])|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|[7-9](?:0[1-9]|[1-9])","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|[49][1246]|6[1-4]|7[13468]|8[13568])|6(?:0[1356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|[7-9](?:0[1-9]|[1-9])"],"0$1"],[,"(3\\d{4})(\\d{1,10})","$1 $2",["3"],"0$1"],[,"(800)(\\d{7,12})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:37|80)|900","1(?:37|80)|900[1359]"],"0$1"],[,"(1\\d{2})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(18\\d{2})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(18\\d)(\\d{8})","$1 $2",["18[2-579]"],"0$1"],[,"(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"],"0$1"],[,"(138)(\\d{4})","$1 $2",["138"],"0$1"],[,"(15[013-68])(\\d{2})(\\d{8})","$1 $2 $3",["15[013-68]"],"0$1"],[,"(15[279]\\d)(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(1[67]\\d)(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})",,,,"177991234567",,,[12,13]]],"DJ":[,[,,"(?:2\\d|77)\\d{6}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DK":[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DM":[,[,,"(?:[58]\\d\\d|767|900)\\d{7}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DO":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DZ":[,[,,"(?:[1-4]|[5-79]\\d|80)\\d{7}",,,,,,,[8,9]],[,,"(?:(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d|9619)\\d{5}",,,,"12345678"],[,,"(?:(?:5[4-6]|7[7-9])\\d|6(?:[569]\\d|7[0-6]))\\d{6}",,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EC":[,[,,"1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"9(?:(?:39|[57][89]|[89]\\d)\\d|6(?:[0-27-9]\\d|30))\\d{5}",,,,"991234567",,,[9]],[,,"1800\\d{6,7}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[247]|[356][2-8]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EE":[,[,,"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d|8[1-4])\\d{6}|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",,,,"51234567",,,[7,8]],[,,"800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d\\d|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-4])","[45]|8(?:00[1-9]|[1-4])"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,,,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EG":[,[,,"(?:[189]\\d?|[24-6])\\d{8}|[13]\\d{7}",,,,,,,[8,9,10],[7]],[,,"(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|5\\d|7[23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}",,,,"234567890",,,[8,9],[7]],[,,"1[0125]\\d{8}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1(?:3|5[239])|[4-6]|[89][2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[0-25]|[89]00"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EH":[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ER":[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}",,,,"8370362",,,,[6]],[,,"17[1-3]\\d{4}|7\\d{6}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ES":[,[,,"(?:51|[6-9]\\d)\\d{7}",,,,,,,[9]],[,,"(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{4}|9(?:(?:(?:[135]\\d|[28][0-8]|4[1-9])\\d\\d|7(?:[124-9]\\d\\d|3(?:[0-8]\\d|9[1-9])))\\d\\d|6(?:[0-8]\\d{4}|9(?:0(?:[0-57-9]\\d\\d|6(?:0[0-8]|1[1-9]|[2-9]\\d))|[1-9]\\d{3}))))\\d\\d",,,,"810123456"],[,,"(?:(?:6\\d|7[1-48])\\d{5}|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|7[0-48]|9(?:0[12]|[1-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],"ET":[,[,,"(?:11|[2-59]\\d)\\d{7}",,,,,,,[9],[7]],[,,"(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",,,,"111112345",,,,[7]],[,,"9\\d{8}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FI":[,[,,"(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}|[1-35689]\\d{4}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1[3-79][1-8]|[235689][1-8]\\d)\\d{2,6}",,,,"131234567",,,[5,6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[6-8])0"],"0$1"],[,"(75\\d{3})","$1",["75[12]"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{4,10})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d)(\\d{4,11})","$1 $2",["[25689][1-8]|3"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})"],[,,"10\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|3[09]\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"10112345"],,,[,,,,,,,,,[-1]]],"FJ":[,[,,"(?:(?:0800\\d|[235-9])\\d|45)\\d{5}",,,,,,,[7,11]],[,,"(?:(?:3[0-5]|8[58])\\d|6(?:03|[25-7]\\d))\\d{4}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FK":[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FM":[,[,,"[39]\\d{6}",,,,,,,[7]],[,,"(?:3[2357]0[1-9]|9[2-6]\\d\\d)\\d{3}",,,,"3201234"],[,,"(?:3[2357]0[1-9]|9[2-7]\\d\\d)\\d{3}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3(?:20|[357])|9","3(?:20[1-9]|[357])|9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FO":[,[,,"(?:[2-8]\\d|90)\\d{4}",,,,,,,[6]],[,,"(?:20|[3-4]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d)\\d{4}",,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[1345][15-7]|2[125-7]|99)\\d{2}",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",,,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FR":[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"[1-5]\\d{8}",,,,"123456789"],[,,"(?:6\\d{2}|7(?:00|[3-9]\\d))\\d{6}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"8[129]\\d{7}",,,,"891123456"],[,,"884\\d{6}",,,,"884012345"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(1\\d{2})(\\d{3})","$1 $2",["11"],"$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,,,,,,,[-1]]],"GA":[,[,,"(?:0\\d|[2-7])\\d{6}",,,,,,,[7,8]],[,,"01\\d{6}",,,,"01441234",,,[8]],[,,"(?:0[2-7]|[2-7])\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,,,,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GB":[,[,,"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",,,,,,,[7,9,10],[4,5,6,8]],[,,"2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}",,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}",,,,"7400123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[02-9]1|1)|3|9[018]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(1\\d{3})(\\d{5,6})","$1 $2",["1"],"0$1"],[,"(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"],[,"(800)(\\d{6})","$1 $2",["800"],"0$1"]],,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],"GD":[,[,,"(?:473|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GE":[,[,,"(?:[3-57]\\d\\d|800)\\d{6}",,,,,,,[9],[6]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6]],[,,"(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"706\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5|790"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"706\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GF":[,[,,"[56]94\\d{6}",,,,,,,[9]],[,,"594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}",,,,"594101234"],[,,"694(?:[0-249]\\d|3[0-48])\\d{4}",,,,"694201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GG":[,[,,"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:781\\d|839\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GG",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],"GH":[,[,,"(?:[235]\\d{3}|800)\\d{5}",,,,,,,[8,9],[7]],[,,"3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}",,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GI":[,[,,"(?:[25]\\d\\d|629)\\d{5}",,,,,,,[8]],[,,"2(?:(?:00\\d|2(?:2[2457]|50))\\d|1(?:6[24-7]\\d|90[0-2]))\\d{3}",,,,"20012345"],[,,"(?:5[46-8]\\d|629)\\d{5}",,,,"57123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GL":[,[,,"(?:19|[2-689]\\d)\\d{4}",,,,,,,[6]],[,,"(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}",,,,"321000"],[,,"(?:[25][1-9]|4[2-9])\\d{4}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GM":[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"[23679]\\d{6}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GN":[,[,,"(?:30|6\\d\\d|722)\\d{6}",,,,,,,[8,9]],[,,"30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}",,,,"30241234",,,[8]],[,,"6[02356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GP":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}",,,,"590201234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GP",590,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GQ":[,[,,"(?:222|(?:3\\d|55|[89]0)\\d)\\d{6}",,,,,,,[9]],[,,"3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}",,,,"333091234"],[,,"(?:222|55[015])\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GR":[,[,,"(?:[268]\\d|[79]0)\\d{8}",,,,,,,[10]],[,,"2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",,,,"2123456789"],[,,"6(?:8[57-9]|9\\d)\\d{7}",,,,"6912345678"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}",,,,"8011234567"],[,,"70\\d{8}",,,,"7012345678"],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[3-8]1|[689]"]],[,"(\\d{4})(\\d{6})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GT":[,[,,"(?:1\\d{3}|[2-7])\\d{7}",,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"[3-5]\\d{7}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GU":[,[,,"(?:[58]\\d\\d|671|900)\\d{7}",,,,,,,[10],[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GW":[,[,,"[49]\\d{8}|4\\d{6}",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["40"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GY":[,[,,"(?:(?:(?:[2-46]\\d|77)\\d|862)\\d|9008)\\d{3}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",,,,"2201234"],[,,"6\\d{6}",,,,"6091234"],[,,"(?:289|862)\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HK":[,[,,"8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",,,,,,,[5,6,7,8,9,11]],[,,"(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:4[04]|9\\d))|58(?:0[1-8]|1[2-9]))\\d{4}",,,,"21234567",,,[8]],[,,"(?:46(?:0[0-6]|10|4[0-57-9])|5(?:(?:[1-59][0-46-9]|6[0-4689])\\d|7(?:[0-2469]\\d|30))|6(?:(?:0[1-9]|[13-59]\\d|[68][0-57-9]|7[0-79])\\d|2(?:[0-57-9]\\d|6[01]))|707[1-5]|8480|9(?:(?:0[1-9]|1[02-9]|[358][0-8]|[467]\\d)\\d|2(?:[0-8]\\d|9[03-9])))\\d{4}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,"00(?:30|5[09]|[126-9]?)",,,,,,"00",,[[,"(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],"HN":[,[,,"[237-9]\\d{7}",,,,,,,[8]],[,,"2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|64|7[013689]|8[0146-9]|9[0-2])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:08|16|4[03-5]|5\\d|6[4-6]|74|80)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",,,,"22123456"],[,,"[37-9]\\d{7}",,,,"91234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HR":[,[,,"(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}",,,,"921234567",,,[8,9]],[,,"80[01]\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}",,,,"611234",,,[6,7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(6[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"([67]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],[,"(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["80[01]"],"0$1"],[,"(80[01])(\\d{3})(\\d{3})","$1 $2 $3",["80[01]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:62\\d?|72)\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],"HT":[,[,,"[2-489]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"[34]\\d{7}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HU":[,[,,"[2357]\\d{8}|[1-9]\\d{7}",,,,,,,[8,9],[6]],[,,"(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],,[,,,,,,,,,[-1]],,,[,,"[48]0\\d{6}",,,,,,,[8]],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],"ID":[,[,,"(?:[1-36]|8\\d{5})\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"2(?:[124]\\d{7,8}|(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])\\d{5,8})|(?:3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}|6(?:1(?:[0-8]\\d{4,7}|9\\d{4,8})|(?:[25]\\d|3[1-69]|4[1-6])\\d{5,8})|2(?:1(?:14|500)|2\\d{3})\\d{3}",,,,"218350123",,,[7,8,9,10,11],[5,6]],[,,"8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"(?:177\\d|800)\\d{5,7}",,,,"8001234567",,,[8,9,10,11]],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"0(?:0[17-9]|10(?:00|1[67]))","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-579]|6[2-5]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"8071\\d{6}",,,,,,,[10]],[,,"(?:1500|8071\\d{3})\\d{3}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],"IE":[,[,,"[148]\\d{9}|[124-9]\\d{8}|[124-69]\\d{7}|[24-69]\\d{6}",,,,,,,[7,8,9,10],[5,6]],[,,"1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})",,,,"2212345",,,,[5,6]],[,,"8(?:22\\d{6}|[35-9]\\d{7})",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"],"(0$1)"],[,"(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"],"(0$1)"],[,"(818)(\\d{3})(\\d{3})","$1 $2 $3",["818"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],[,"(8\\d)(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8[35-9]5"],"0$1"],[,"(700)(\\d{3})(\\d{3})","$1 $2 $3",["700"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:5|8[059])","1(?:5|8[059]0)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,,,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"8[35-9]5\\d{7}",,,,"8551234567",,,[10]]],"IL":[,[,,"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,"(?:153\\d{1,2}|[2-489])\\d{7}",,,,"21234567",,,[8,11,12],[7]],[,,"5(?:[0-489][2-9]\\d|5(?:01|2[2-5]|3[23]|4[45]|5[05689]|6[6-8]|7[0-267]|8[7-9]|9[1-9])|6\\d{2})\\d{5}",,,,"502345678",,,[9]],[,,"1(?:80[019]\\d{3}|255)\\d{3}",,,,"1800123456",,,[7,10]],[,,"1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}",,,,"1919123456",,,[8,9,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2357-9]\\d)\\d{5}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(153)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["153"]],[,"(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(1255)(\\d{3})","$1-$2",["125","1255"]],[,"(1200)(\\d{3})(\\d{3})","$1-$2-$3",["120","1200"]],[,"(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121","1212"]],[,"(1599)(\\d{6})","$1-$2",["159","1599"]],[,"(151)(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["151"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}",,,,,,,[10]],[,,"1599\\d{6}",,,,"1599123456",,,[10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],"IM":[,[,,"(?:1624|(?:[3578]\\d|90)\\d\\d)\\d{6}",,,,,,,[10],[6]],[,,"1624[5-8]\\d{5}",,,,"1624756789",,,,[6]],[,,"7(?:4576|[59]24\\d|624[0-4689])\\d{5}",,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"(?:872299|90[0167]624)\\d{4}",,,,"9016247890"],[,,"8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}",,,,"8456247890"],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],"IN":[,[,,"(?:00800|1\\d{0,5}|[2-9]\\d\\d)\\d{7}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"(?:11|2[02]|33|4[04]|79|80)[2-7]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",,,,"7410410123",,,[10],[6,7,8]],[,,"(?:6(?:0(?:0[0-3569]|26|33)\\d|1279|2(?:[06]\\d|3[02589]|8[0-479]|9[0-79])\\d|3(?:0[0-79]\\d|5(?:0[0-6]|[1-9]\\d)|6[0-4679]\\d|7[0-24-9]\\d|[89]\\d{2})|9(?:0[019]|13)\\d)|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|11|7[02-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-7][089]|[289]\\d)|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[04-9]))|1(?:[0-57-9]\\d{2}|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02-8])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-8])|2(?:[089]\\d|7[02-8])|4\\d{2}|6(?:[089]\\d|7[02-8]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-8])|6(?:[08]\\d|7[02-8]|9\\d))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-8]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[02-8])))|9\\d{4})\\d{5}",,,,"8123456789",,,[10]],[,,"00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{8})","$1",["561","5616","56161"],"$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["6(?:0[023]|12|2[03689]|3[05-9]|9[019])|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9","6(?:0(?:0|26|33)|127|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:[07]|19[0-5]|2(?:[0235-9]|[14][017-9])|3(?:[025-9]|[134][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02-46-9]|[15][017-9])|6(?:[02-9]|1[0-257-9])|8(?:[0-79]|8[0189])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:[014][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9","6(?:0(?:0|26|33)|1279|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:0|19[0-5]|2(?:[0235-79]|[14][017-9]|8(?:[0-69]|[78][089]))|3(?:[05-8]|1(?:[0189]|7[02-9])|2(?:[0-49][089]|[5-8])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2-5][089]|7[0189]))|4(?:[056]|1(?:[0135-9]|[24][089])|[29](?:[0-7][089]|[89])|3(?:[0-8][089]|9)|[47](?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389]))|5(?:[0346-9]|[15][017-9]|2(?:[03-9]|[12][089]))|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[04-9]))|1(?:[0-57-9]|6(?:[089]|7[02-8]))|2(?:[014](?:[089]|7[02-8])|[235-9])|3(?:[03-57-9]|[126](?:[089]|7[02-8]))|[45]|6(?:[02457-9]|[136](?:[089]|7[02-8]))|7(?:0[07-9]|[1-69]|[78](?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-8]))|9(?:[02-9]|1(?:[0289]|7[02-8])))|9"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-9]|80[2-46]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|[68][1-9]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"],"0$1",,1],[,"(\\d{2})(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3 $4",["008"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],"$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1",,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{3,4})(\\d{4})","$1 $2 $3",["186","1860"],"$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18[06]"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],"IO":[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IQ":[,[,,"(?:1|[2-6]\\d?|7\\d\\d)\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IR":[,[,,"[1-9]\\d{9}|[1-8]\\d{5,6}",,,,,,,[6,7,10],[4,5,8]],[,,"(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:\\d{8}|(?:[16]|[289]\\d?)\\d{3}))|94(?:000|11[0-7]|2\\d{2}|30[01]|4(?:11|40))\\d{5}",,,,"2123456789",,,,[4,5,8]],[,,"9(?:0(?:[1-35]\\d{2}|44\\d)|[13]\\d{3}|2[0-2]\\d{2}|9(?:[01]\\d{2}|44\\d|8(?:10|88)|9(?:0[013]|1[134]|21|9[89])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"993\\d{7}",,,,"9932123456",,,[10]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["[1-8]"],"0$1"],[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:9411[1-7]|94440)\\d{5}",,,,,,,[10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IS":[,[,,"(?:38\\d|[4-9])\\d{6}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",,,,"4101234",,,[7]],[,,"(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-8]\\d|9[0-3])|8(?:2[0-59]|[3469]\\d|5[1-9]|8[28]))\\d{4}",,,,"6111234"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"90\\d{5}",,,,"9011234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49\\d{5}",,,,"4921234",,,[7]],"IS",354,"00|1(?:0(?:01|[12]0)|100)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[0189]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],"IT":[,[,,"0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9,10,11]],[,,"0(?:(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d|6(?:[0-57-9]\\d\\d|6(?:[0-8]\\d|9[0-79])))\\d{1,6}",,,,"0212345678"],[,,"33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[67]|99)|[38]"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"JE":[,[,,"(?:1534|(?:[3578]\\d|90)\\d\\d)\\d{6}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,"8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}",,,,"8447034567"],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],"JM":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",,,,"8765230123",,,,[7]],[,,"876(?:(?:2[14-9]|[348]\\d)\\d|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"JO":[,[,,"(?:(?:(?:[268]|7\\d)\\d|32|53)\\d|900)\\d{5}",,,,,,,[8,9]],[,,"(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[05]0|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:[029]0|7[08]))\\d{4}",,,,"62001234",,,[8]],[,,"7(?:55[0-49]|(?:7[025-9]|[89][0-25-9])\\d)\\d{5}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["7"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],"JP":[,[,,"00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",,,,"9012345678",,,[10]],[,,"(?:00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)|(?:120|800\\d)\\d{4})\\d\\d",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"0",,,,[[,"(\\d{4})(\\d{4})","$1-$2",["007","0077","00777","00777[01]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["2[2-9]|4|7[235-9]|9[49]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["007"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["0"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["2[2-9]|4|7[235-9]|9[49]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],"KE":[,[,,"(?:(?:2|80)0\\d?|[4-7]\\d\\d|900)\\d{6}|[4-6]\\d{6,7}",,,,,,,[7,8,9,10]],[,,"20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})",,,,"202012345",,,[7,8,9]],[,,"7\\d{8}",,,,"712123456",,,[9]],[,,"800[24-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KG":[,[,,"(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}",,,,,,,[9,10],[5,6]],[,,"(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|99[69])\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[25-79]|31[25]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KH":[,[,,"1\\d{9}|[1-9]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}",,,,"23756789",,,[8,9],[6,7]],[,,"(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}",,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0","1[89]00"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KI":[,[,,"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|(?:65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d{2}|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500)))\\d{3}",,,,"31234"],[,,"(?:6(?:200[01]|30[01]\\d)|7(?:200[01]|3(?:0[0-5]\\d|140)))\\d{3}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d{2}|12(?:11|20))\\d{2}",,,,"30010000",,,[8]],"KI",686,"00",,,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KM":[,[,,"[3478]\\d{6}",,,,,,,[7]],[,,"7[4-7]\\d{5}",,,,"7712345"],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KN":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KP":[,[,,"(?:(?:19\\d|2)\\d|85)\\d{6}",,,,,,,[8,10],[6,7]],[,,"2\\d{7}|85\\d{6}",,,,"21234567",,,[8],[6,7]],[,,"19[123]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KR":[,[,,"(?:00[1-9]\\d{2,4}|[12]|5\\d{3})\\d{7}|(?:(?:00|[13-6])\\d|70)\\d{8}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,7]],[,,"2[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})",,,,"22123456",,,[5,6,8,9,10],[3,7]],[,,"1[0-26-9]\\d{7,8}",,,,"1000000000",,,[9,10]],[,,"(?:00(?:3(?:08|68\\d)|798\\d{1,3})|80\\d)\\d{6}",,,,"801234567",,,[9,11,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8,9}",,,,"5012345678",,,[10,11]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8[1-46-8]|85\\d{2})?",,,,[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["50"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030","00308"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["00[37]","00(?:36|79)","00(?:36|79)8"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["007","0079","00798"],"$1","0$CC-$1"]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["50"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00(?:3(?:08|68\\d)|798\\d{1,3})\\d{6}",,,,,,,[11,12,13,14]],[,,"1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],"KW":[,[,,"(?:18|[2569]\\d\\d)\\d{5}",,,,,,,[7,8]],[,,"2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",,,,"22345678",,,[8]],[,,"(?:5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25]))|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|222|7(?:0[013-9]|[67]\\d)|9(?:[069]\\d|3[039]))|9(?:(?:0[09]|22|4[01479]|55|6[0679]|8[057-9]|9\\d)\\d|11[01]|7(?:02|[1-9]\\d)))\\d{4}",,,,"50012345",,,[8]],[,,"18\\d{5}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],[,"(\\d{3})(\\d{5})","$1 $2",["[25]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KY":[,[,,"(?:345|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],[,,"345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"(?:345976|900[2-9]\\d\\d)\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"1",,,,,,[,,"345849\\d{4}",,,,"3458491234"],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KZ":[,[,,"(?:33622|(?:7\\d|80)\\d{3})\\d{5}",,,,,,,[10]],[,,"33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",,,,"7123456789"],[,,"7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}",,,,"7710009998"],[,,"800\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,"751\\d{7}",,,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,,[,,"751\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LA":[,[,,"(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8,9],[6]],[,,"20(?:2[2389]|5[24-689]|7[6-8]|9[1-35-9])\\d{6}",,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"],"0$1"],[,"([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LB":[,[,,"[7-9]\\d{7}|[13-9]\\d{6}",,,,,,,[7,8]],[,,"(?:(?:[14-69]\\d|8[02-9])\\d|7(?:[2-57]\\d|62|8[0-7]|9[04-9]))\\d{4}",,,,"1123456",,,[7]],[,,"(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3]))\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LC":[,[,,"(?:[58]\\d\\d|758|900)\\d{7}",,,,,,,[10],[7]],[,,"758(?:4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LI":[,[,,"(?:(?:[2378]|6\\d\\d)\\d|90)\\d{5}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}",,,,"660234567"],[,,"80(?:02[28]|9\\d{2})\\d{2}",,,,"8002222",,,[7]],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"0|10(?:01|20|66)",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],[,"(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d{2}",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],"LK":[,[,,"(?:[1-7]\\d|[89]1)\\d{7}",,,,,,,[9],[7]],[,,"1(?:1[2-57]\\d{6}|973\\d{5})|(?:2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7]|[89]1)[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7[0125-8]\\d{7}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LR":[,[,,"(?:[25]\\d|33|77|88)\\d{7}|(?:2\\d|[45])\\d{6}",,,,,,,[7,8,9]],[,,"(?:2\\d{3}|33333)\\d{4}",,,,"21234567",,,[8,9]],[,,"(?:(?:(?:20|77|88)\\d|330|555)\\d|4[67])\\d{5}|5\\d{6}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[2-5]\\d)\\d{4}",,,,"332021234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LS":[,[,,"(?:[256]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2568]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LT":[,[,,"(?:[3469]\\d|52|[78]0)\\d{6}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"800\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"LT",370,"00","8",,,"[08]",,,,[[,"([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"],"(8-$1)",,1],[,"([3-6]\\d{2})(\\d{5})","$1 $2",["3[148]|4(?:[24]|6[09])|528|6"],"(8-$1)",,1],[,"([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],"LU":[,[,,"[2457-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5(?:[013-9]\\d{1,8}|2\\d{1,3}))|6\\d{8}",,,,,,,[4,5,6,7,8,9,10,11]],[,,"2[2-9]\\d{2,9}|(?:3(?:[0-46-9]\\d|5[013-9])|[457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8}",,,,"27123456"],[,,"6(?:[269][18]|5[158]|7[189]|81)\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:0[2-9]|[1-9])|9(?:0[2-46-9]|[1-9])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["70|80[01]|90[015]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LV":[,[,,"(?:[268]\\d|90)\\d{6}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2\\d{7}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LY":[,[,,"(?:[2569]\\d|71)\\d{7}",,,,,,,[9],[7]],[,,"(?:2[1345]|5[1347]|6[123479]|71)\\d{7}",,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"([25-79]\\d)(\\d{7})","$1-$2",["[25-79]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MA":[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"],"0$1"],[,"(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|9)|892"],"0$1"],[,"(\\d{5})(\\d{4})","$1-$2",["5[23]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5"],"0$1"],[,"(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MC":[,[,,"(?:(?:[349]|6\\d)\\d\\d|870)\\d{5}",,,,,,,[8,9]],[,,"(?:870|9[2-47-9]\\d)\\d{5}",,,,"99123456",,,[8]],[,,"(?:(?:3|6\\d)\\d\\d|4(?:4\\d|5[1-9]))\\d{5}",,,,"612345678"],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"870\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MD":[,[,,"(?:[235-7]\\d|[89]0)\\d{6}",,,,,,,[8]],[,,"(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"(?:562|6\\d\\d|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],"ME":[,[,,"(?:20|[3-79]\\d|80\\d?)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:[01][2467]|2[2-467]))\\d{5}",,,,"30234567",,,[8],[6]],[,,"6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}",,,,"67622901",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"(?:9(?:4[1568]|5[178]))\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57-9]|6[036-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],"MF":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MG":[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}",,,,"202123456",,,,[7]],[,,"3[2-49]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"0",,,,[[,"([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MH":[,[,,"(?:(?:[256]\\d|45)\\d|329)\\d{4}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:(?:23|54)5|329|45[56])\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MK":[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:[0-25-8]\\d{2}|3[2-4]\\d|421|9[23]\\d)\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5[02-9]\\d{6}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ML":[,[,,"(?:[246-9]\\d|50)\\d{6}",,,,,,,[8]],[,,"(?:2(?:0(?:2\\d|7[0-8])|1(?:2[67]|[4-689]\\d))|4(?:0[0-4]|4[1-39])\\d)\\d{4}",,,,"20212345"],[,,"(?:2(?:079|17\\d)|50\\d{2}|[679]\\d{3}|8[239]\\d{2})\\d{4}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]],[,"(\\d{4})","$1",["67|74"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MM":[,[,,"(?:1|[24-7]\\d)\\d{5,7}|8\\d{6,9}|9(?:[0-46-9]\\d{6,8}|5\\d{6})|2\\d{5}",,,,,,,[6,7,8,9,10],[5]],[,,"1(?:2\\d{1,2}|[35]\\d|4(?:\\d|2[2-469]|39|6[25]|70)|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|2[246]\\d{4}|39\\d{4}|62\\d{4}|70\\d{4}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2(?:[25-8]|4(?:80)?)|3(?:2(?:02)?|[36]|4(?:70)?|56?)|[46][2-6]|5(?:[35]|4(?:70)?))\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[35-8]|4(?:70)?)|3[2-68]|4(?:21?|4(?:70)?|[5-8])|5[23]|6[2-4]|7(?:[235-8]|4(?:80)?)|8(?:[25-7]|4(?:70)?)|9(?:[235-7]|4(?:70)?))\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3(?:[25-6]|4(?:70)?)|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4(?:\\d|39|[67]0)|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04](?:[25-8]|4(?:70)?)|1(?:20?|[35-7]|4(?:70)?)|22|3[2-4]|5(?:[235-7]|4(?:70)?))\\d{4}|8(?:1(?:2\\d{1,2}|[35689]\\d|4(?:70)?\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3(?:2|4(?:70)?)\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",,,,"1234567",,,[6,7,8,9],[5]],[,,"17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|6(?:1\\d|9\\d{2}|\\d)|7(?:3|5[0-2]|[6-9]\\d)\\d|8(?:\\d|9\\d{2})|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,"80080[01][1-9]\\d{3}",,,,"8008001234",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:1(?:333|468)|2468)\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"],"0$1"],[,"(2)(\\d{4})(\\d{4})","$1 $2 $3",["251"],"0$1"],[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[4-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-8]"],"0$1"],[,"(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MN":[,[,,"[12]\\d{8,9}|[1257-9]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}",,,,"50123456",,,,[6,7]],[,,"(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"7[05-8]\\d{6}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"([12]2\\d)(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)2"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],[,"([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MO":[,[,,"(?:28|[68]\\d)\\d{6}",,,,,,,[8]],[,,"(?:28[2-57-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345"],[,,"6(?:[2356]\\d\\d|8(?:[02][5-9]|[1478]\\d|[356][0-4]))\\d{4}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MP":[,[,,"(?:[58]\\d\\d|(?:67|90)0)\\d{7}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MQ":[,[,,"(?:596|69\\d)\\d{6}",,,,,,,[9]],[,,"596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}",,,,"596301234"],[,,"69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",,,,"696201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MR":[,[,,"(?:[2-4]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"(?:25[08]|35\\d|45[1-7])\\d{5}",,,,"35123456"],[,,"[2-4][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MS":[,[,,"(?:(?:[58]\\d\\d|900)\\d\\d|66449)\\d{5}",,,,,,,[10],[7]],[,,"664491\\d{4}",,,,"6644912345",,,,[7]],[,,"66449[2-6]\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MT":[,[,,"(?:(?:[2579]\\d\\d|800)\\d|3550)\\d{4}",,,,,,,[8]],[,,"2(?:0(?:[169]\\d|3[1-4])|[1-357]\\d\\d)\\d{4}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d\\d)|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d\\d))\\d{4}",,,,"96961234"],[,,"800[3467]\\d{4}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],"MU":[,[,,"(?:[2-468]|5\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:2(?:[03478]\\d|1[0-7]|6[1-79])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}",,,,"54480123"],[,,"5(?:2[589]\\d|4(?:2[1-389]|[489]\\d|7[1-9])|7\\d{2}|8(?:[0-689]\\d|7[15-8])|9[0-8]\\d)\\d{4}",,,,"52512345",,,[8]],[,,"80[012]\\d{4}",,,,"8001234",,,[7]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[2-7]0|33)",,,,,,"020",,[[,"([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],[,"(5\\d{3})(\\d{4})","$1 $2",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MV":[,[,,"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",,,,,,,[7,10]],[,,"(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024-68]|8[024689]))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|(?:7[2-9]|9[14-9])\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[367]|4(?:00|[56])|9[14-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4[05]0\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],"MW":[,[,,"1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",,,,,,,[7,9]],[,,"(?:1[2-9]|21\\d\\d)\\d{5}",,,,"1234567"],[,,"(?:111|(?:77|88|99)\\d)\\d{6}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"31\\d{7}",,,,"310123456",,,[9]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[17-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MX":[,[,,"(?:1\\d|[2-9])\\d{9}",,,,,,,[10,11],[7,8]],[,,"(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",,,,"2221234567",,,[10],[7,8]],[,,"1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})",,,,"12221234567",,,[11]],[,,"8(?:00|88)\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,"300\\d{7}",,,,"3001234567",,,[10]],[,,"500\\d{7}",,,,"5001234567",,,[10]],[,,,,,,,,,[-1]],"MX",52,"0[09]","01",,,"0[12]|04[45](\\d{10})","1$1",,,[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",,1],[,"(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",,1]],[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3 $4",["1(?:33|55|81)"]],[,"(1)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MY":[,[,,"(?:1\\d\\d?|3\\d|[4-9])\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[346]\\d|5[0-489]|7[1-9]|8[0-567-9]|9[23])|6(?:2[2-9]|3[135789]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|8[0-35-9]|6[5-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",,,,"323856789",,,[8,9],[6,7]],[,,"1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])\\d|1(?:[1-5]\\d{2}|6(?:0[5-9]|[1-9]\\d))\\d|[23679][2-9]\\d{2}|4(?:[235-9]\\d{2}|400)|59\\d{3}|8(?:1[23]\\d|[236]\\d{2}|4(?:[06]\\d|7[0-4])|5[7-9]\\d|7[016-9]\\d|8(?:[01]\\d|[27][0-4])|9[0-8]\\d))\\d{4}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"154(?:6(?:0\\d|1[0-3])|8(?:[25]1|4[0189]|7[0-4679]))\\d{4}",,,,"1546012345",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",["1[02-46-9][1-9]|8"],"0$1"],[,"(1)([36-8]00)(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]0","1[36-8]00"]],[,"(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],[,"(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15[49]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MZ":[,[,,"(?:2|8\\d)\\d{7}",,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-7]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NA":[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"6(?:1(?:[02-4]\\d\\d|17)|2(?:17|54\\d|69|70)|3(?:17|2[0237]\\d|34|6[289]|7[01]|81)|4(?:17|(?:27|41|5[25])\\d|69|7[01])|5(?:17|2[236-8]\\d|69|7[01])|6(?:17|26\\d|38|42|69|7[01])|7(?:17|(?:2[2-4]|30)\\d|6[89]|7[01]))\\d{4}|6(?:1(?:2[2-7]|3[01378]|4[0-4]|69|7[014])|25[0-46-8]|32\\d|4(?:2[0-27]|4[016]|5[0-357])|52[02-9]|62[56]|7(?:2[2-69]|3[013]))\\d{4}",,,,"61221234"],[,,"(?:60|8[1245])\\d{7}",,,,"811234567",,,[9]],[,,"80\\d{7}",,,,"800123456",,,[9]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d\\d|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[0-5]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NC":[,[,,"[2-57-9]\\d{5}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}",,,,"751234"],[,,,,,,,,,[-1]],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[247-9]|3[0-6]|5[0-4]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NE":[,[,,"[0289]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",,,,"20201234"],[,,"(?:8[04589]|9\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["09|[289]"]],[,"(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NF":[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"3[58]\\d{4}",,,,"381234",,,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,,,,,[[,"(\\d{2})(\\d{4})","$1 $2",["1"]],[,"(\\d)(\\d{5})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NG":[,[,,"[78]\\d{10,13}|[7-9]\\d{9}|[1-9]\\d{7}|[124-7]\\d{6}",,,,,,,[7,8,10,11,12,13,14],[5,6]],[,,"[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}",,,,"18040123",,,[7,8],[5,6]],[,,"(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}",,,,"8021234567",,,[8,10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:0[1-9]|[1-79])|8[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[235-9]"],"0$1"],[,"([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"],"0$1"],[,"([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]00"],"0$1"],[,"(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],"NI":[,[,,"(?:1800|[25-8]\\d{3})\\d{4}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NL":[,[,,"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8])|[89]\\d{0,3})\\d{6}|1\\d{4,5}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",,,,"101234567",,,[9]],[,,"6[1-58]\\d{7}",,,,"612345678",,,[9]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:85|91)\\d{7}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["14"]],[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-5]"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6[1-58]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["6"],"0$1"]],[[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-5]"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6[1-58]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["6"],"0$1"]],[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])",,,,,,,[5,6]],[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])|8[478]\\d{7}",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],"NO":[,[,,"(?:0|[2-9]\\d{3})\\d{4}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],[,"([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],"NP":[,[,,"9\\d{9}|[1-9]\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(1)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"],"0$1"],[,"(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NR":[,[,,"(?:444|55\\d|888)\\d{4}",,,,,,,[7]],[,,"(?:444|888)\\d{4}",,,,"4441234"],[,,"55[4-9]\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[458]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NU":[,[,,"(?:[47]|888\\d)\\d{3}",,,,,,,[4,7]],[,,"[47]\\d{3}",,,,"7012",,,[4]],[,,"888[4-9]\\d{3}",,,,"8884012",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NZ":[,[,,"[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}",,,,,,,[8,9,10],[7]],[,,"(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}",,,,"32345678",,,[8],[7]],[,,"2(?:[028]\\d{7,8}|1\\d{6,8}|[79]\\d{7})",,,,"211234567"],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456"],[,,"90\\d{6,7}",,,,"900123456",,,[8,9]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["240|[346]|7[2-57-9]|9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"],"0$1"],[,"(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["90"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|5|[89]0"],"0$1"]],,[,,"[28]6\\d{6,7}",,,,"26123456",,,[8,9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"OM":[,[,,"(?:[279]\\d{3}|500|8007\\d?)\\d{4}",,,,,,,[7,8,9]],[,,"2[2-6]\\d{6}",,,,"23123456",,,[8]],[,,"(?:7(?:[19]\\d|22)|9(?:0[1-9]|[1-9]\\d))\\d{5}",,,,"92123456",,,[8]],[,,"(?:500|8007\\d?)\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],[,"(\\d{2})(\\d{6})","$1 $2",["2"]],[,"(\\d{4})(\\d{4})","$1 $2",["[79]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PA":[,[,,"(?:[1-57-9]|6\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|[68][58]|7[0167]|9[39])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-35]|33|4[0-579]|55|6[068]|7[06-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[05]|7[0-24-9]|8[7-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|6(?:[02-9]\\d|1[0-5])\\d|8(?:1[01]|7[23]))\\d{4}",,,,"61234567"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PE":[,[,,"(?:[14-8]|9\\d)\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(1)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PF":[,[,,"[48]\\d{7}|4\\d{5}",,,,,,,[6,8]],[,,"4(?:[09][45689]\\d|4)\\d{4}",,,,"40412345"],[,,"8[79]\\d{6}",,,,"87123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,,,,[6]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PG":[,[,,"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",,,,,,,[7,8]],[,,"(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}",,,,"3123456",,,[7]],[,,"(?:7(?:[0-689]\\d|75)|81\\d)\\d{5}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-47]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"140[1-3]|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],[,"(\\d{4})(\\d{4})","$1 $2",["20|[78]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PH":[,[,,"(?:1800\\d{2,4}|2|[89]\\d{4})\\d{5}|[3-8]\\d{8}|[28]\\d{7}",,,,,,,[6,8,9,10,11,12,13],[5,7]],[,,"2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})",,,,"21234567",,,[6,8,9,10],[5,7]],[,,"(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(2)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],"0$1"],[,"(1800)(\\d{3})(\\d{4})","$1 $2 $3",["180","1800"]],[,"(1800)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["180","1800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PK":[,[,,"(?:122|[24-8]\\d{4,5}|9(?:[013-9]\\d{2,4}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d))\\d{6}|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",,,,,,,[8,9,10,11,12],[6,7]],[,,"(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}",,,,"2123456789",,,[9,10],[6,7,8]],[,,"3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"],[,"(1\\d{3})(\\d{5})","$1 $2",["1"],"$1"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{3})(\\d{6,7})","$1 $2",["2[349]|45|54|60|72|8[2-5]|9[2-469]","(?:2[349]|45|54|60|72|8[2-5]|9[2-469])\\d[2-9]"],"(0$1)"],[,"(58\\d{3})(\\d{5})","$1 $2",["58[126]"],"(0$1)"],[,"(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"],"(0$1)"],[,"(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],"PL":[,[,,"[1-9]\\d{6}(?:\\d{2})?|6\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9]],[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:\\d{7}|19\\d{3})",,,,"123456789",,,[7,9]],[,,"(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["11[68]|64"]],[,"(\\d{5})","$1",["19"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]]],,[,,"64\\d{4,7}",,,,"641234567"],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],"PM":[,[,,"[45]\\d{5}",,,,,,,[6]],[,,"(?:4[1-3]|50)\\d{4}",,,,"430123"],[,,"(?:4[02-4]|5[05])\\d{4}",,,,"551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PR":[,[,,"(?:[589]\\d\\d|787)\\d{7}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PS":[,[,,"(?:(?:1\\d|5)\\d\\d|[2489]2)\\d{6}",,,,,,,[8,9,10],[7]],[,,"(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]2"],"0$1"],[,"(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["5[69]"],"0$1"],[,"(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[78]0","1[78]00"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PT":[,[,,"(?:[26-9]\\d|30)\\d{7}",,,,,,,[9]],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"9(?:[1-36]\\d\\d|480)\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:7\\d|8[17])\\d{5}",,,,"707123456"],,,[,,"600\\d{6}",,,,"600110000"]],"PW":[,[,,"(?:[25-8]\\d\\d|345|488|900)\\d{4}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],[,,"(?:6[2-4689]0|77\\d|88[0-4])\\d{4}",,,,"6201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PY":[,[,,"(?:[2-46-9]\\d|5[0-8])\\d{7}|[2-9]\\d{5,7}",,,,,,,[6,7,8,9],[5]],[,,"(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["870","8700"]],[,"(\\d{3})(\\d{4,5})","$1 $2",["[2-8][1-9]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8][1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567"],,,[,,,,,,,,,[-1]]],"QA":[,[,,"(?:(?:2|[3-7]\\d)\\d\\d|800)\\d{4}",,,,,,,[7,8]],[,,"4[04]\\d{6}",,,,"44123456",,,[8]],[,,"[35-7]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],[,"(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RE":[,[,,"(?:26|[68]\\d)\\d{7}",,,,,,,[9]],[,,"262\\d{6}",,,,"262161234"],[,,"69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-38]|9[0-479]))\\d{4}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RE",262,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[268]"],"0$1"]],,[,,,,,,,,,[-1]],1,"262|69|8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RO":[,[,,"(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",,,,,,,[6,9]],[,,"[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",,,,"211234567"],[,,"7(?:(?:[02-7]\\d|8[03-8]|99)\\d|1(?:[01]\\d|20))\\d{5}",,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[036]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],[,"(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"37\\d{7}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],"RS":[,[,,"[127]\\d{6,11}|3(?:[0-79]\\d{5,10}|8(?:[02-9]\\d{4,9}|1\\d{4,5}))|6\\d{7,9}|800\\d{3,9}|90\\d{4,8}|7\\d{5}",,,,,,,[6,7,8,9,10,11,12],[5]],[,,"(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}",,,,"10234567",,,[7,8,9,10,11,12],[5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:90[0169]|78\\d)\\d{3,7}",,,,"90012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"],"0$1"],[,"([1-3]\\d)(\\d{5,10})","$1 $2",["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],"0$1"],[,"(6\\d)(\\d{6,8})","$1 $2",["6"],"0$1"],[,"([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"],"0$1"],[,"(7[26])(\\d{4,9})","$1 $2",["7[26]"],"0$1"],[,"(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],"RU":[,[,,"[347-9]\\d{9}",,,,,,,[10]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567"],[,,"9\\d{9}",,,,"9123456789"],[,,"80[04]\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[1-79]"],"$1",,1],[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RW":[,[,,"(?:06|[27]\\d\\d|[89]00)\\d{6}",,,,,,,[8,9]],[,,"(?:06|2[258]\\d)\\d{6}",,,,"250123456"],[,,"7[238]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SA":[,[,,"(?:(?:[15]|8\\d)\\d|92)\\d{7}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"5(?:[013-689]\\d|7[0-36-8])\\d{6}",,,,"512345678",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"925\\d{6}",,,,"925012345",,,[9]],[,,"920\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["800"],"$1"],[,"(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["811"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"811\\d{7}",,,,"8110123456"],,,[,,,,,,,,,[-1]]],"SB":[,[,,"(?:[1-6]|[7-9]\\d\\d)\\d{4}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"(?:48|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d)\\d{3}",,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["7[1-9]|8[4-9]|9(?:1[2-9]|2[013-9]|3[0-2]|[46]|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SC":[,[,,"(?:(?:(?:[24]\\d|64)\\d|971)\\d|8000)\\d{3}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[5-8]\\d{5}",,,,"2510123"],[,,"8000\\d{3}",,,,"8000000"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:64\\d|971)\\d{4}",,,,"6412345"],"SC",248,"0(?:[02]|10?)",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SD":[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[3567])\\d{6}",,,,"151231234"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SE":[,[,,"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|[27]\\d{5}",,,,,,,[6,7,8,9,10,12]],[,,"1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})",,,,"771234567",,,[6,9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"([1-469]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1"],[,"(9[034]\\d)(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1"],[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1"],[,"(77)(\\d{2})(\\d{2})","$1-$2$3",["77"],"0$1"],[,"(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["25[245]|67[3-68]"],"0$1"]],[[,"([1-469]\\d)(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]],[,"(9[034]\\d)(\\d{4})","$1 $2",["9(?:00|39|44)"]],[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7"]],[,"(77)(\\d{2})(\\d{2})","$1 $2 $3",["77"]],[,"(20)(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9[034]"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["25[245]|67[3-68]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"(?:25[245]|67[3-68])\\d{9}",,,,"254123456789",,,[12]]],"SG":[,[,,"(?:1\\d{3}|[369]|7000|8(?:\\d{2})?)\\d{7}",,,,,,,[8,10,11]],[,,"6[1-9]\\d{6}",,,,"61234567",,,[8]],[,,"(?:8[1-8]|9[0-8])\\d{6}",,,,"81234567",,,[8]],[,,"(?:18|8)00\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[12]\\d{6}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8[1-8]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1[89]"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["70"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],"SH":[,[,,"(?:[256]\\d|8)\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d\\d",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d\\d",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,"[256]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SI":[,[,,"[1-8]\\d{7}|90\\d{4,6}|8\\d{4,6}",,,,,,,[5,6,7,8]],[,,"(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}",,,,"11234567",,,[8],[7]],[,,"(?:[37][01]\\d|4[0139]\\d|51\\d|6(?:[48]\\d|5[15-7]|9[69]))\\d{5}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"90\\d{4,6}|89[1-3]\\d{2,5}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59|8[1-3])\\d{6}",,,,"59012345",,,[8]],"SI",386,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|[34][24-8]|5[2-8]|7[3-8]"],"(0$1)"],[,"([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"([89][09])(\\d{3,6})","$1 $2",["[89][09]"],"0$1"],[,"([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SJ":[,[,,"(?:0|(?:[4589]\\d|79)\\d\\d)\\d{4}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],"SK":[,[,,"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",,,,,,,[6,7,9]],[,,"(?:2(?:16|[2-9]\\d{3})|[3-5][1-8]\\d{3})\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",,,,"221234567"],[,,"9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:00|[78]\\d)\\d{6}",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d{4})(\\d{3})","$1 $2",["909","9090"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"]],,[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"(?:(?:602|8(?:00|[5-9]\\d))\\d{3}|9(?:0(?:0\\d{3}|90)|[78]\\d{4}))\\d{3}",,,,,,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],"SL":[,[,,"(?:[2-578]\\d|66|99)\\d{6}",,,,,,,[8],[6]],[,,"[235]2[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:2[15]|3[013-5]|4[04]|5[05]|66|7[5-9]|8[08]|99)\\d{6}",,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",,"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SM":[,[,,"(?:0549|[5-7]\\d)\\d{6}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})","0549$1",,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","$1 $2",["054","0549"]],[,"(\\d{6})","0549 $1",["[89]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","($1) $2",["054","0549"]],[,"(\\d{6})","(0549) $1",["[89]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SN":[,[,,"(?:[378]\\d{4}|93330)\\d{4}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:[06-8]\\d|21|90)\\d{6}",,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"(?:3(?:392|9[01]\\d)\\d|93330)\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SO":[,[,,"[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}",,,,,,,[6,7,8,9]],[,,"(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}",,,,"4012345",,,[6,7]],[,,"(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[13-5]|2[0-79]"]],[,"(\\d)(\\d{7})","$1 $2",["24|[67]"]],[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3[59]|4[89]|6[24-6]|79|8[08]|90"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SR":[,[,,"(?:[2-5]|68|[78]\\d)\\d{5}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[125-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["5"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SS":[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"18\\d{7}",,,,"181234567"],[,,"(?:12|9[1257])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ST":[,[,,"(?:22|9\\d)\\d{5}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d\\d)\\d{3}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SV":[,[,,"[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2[1-6]\\d{6}",,,,"21234567",,,[8]],[,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{4}(?:\\d{4})?",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SX":[,[,,"(?:(?:[58]\\d\\d|900)\\d|7215)\\d{6}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SY":[,[,,"[1-39]\\d{8}|[1-5]\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"9(?:22|[3-589]\\d|6[024-9])\\d{6}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SZ":[,[,,"(?:0800|(?:[237]\\d|900)\\d\\d)\\d{4}",,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[6-9]\\d{6}",,,,"76123456",,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TA":[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TC":[,[,,"(?:[58]\\d\\d|649|900)\\d{7}",,,,,,,[10],[7]],[,,"649(?:712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"64971[01]\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TD":[,[,,"(?:22|[69]\\d|77)\\d{6}",,,,,,,[8]],[,,"22(?:[37-9]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:6[023568]|77|9\\d)\\d{6}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TG":[,[,,"[279]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[09]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TH":[,[,,"(?:1\\d\\d?|[2-57]|[689]\\d)\\d{7}",,,,,,,[8,9,10]],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TJ":[,[,,"(?:[3-59]\\d|77|88)\\d{7}",,,,,,,[9],[3,5,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,7]],[,,"(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810","8",,,"8",,"8~10",,[[,"([349]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],,,1],[,"([457-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[148]|[578]|9(?:[0235-9]|1[59])"],,,1],[,"(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"],,,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"],,,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TK":[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TL":[,[,,"(?:[2-4]\\d|7\\d\\d?|[89]0)\\d{5}",,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[3-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TM":[,[,,"[1-6]\\d{7}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",,,,"12345678"],[,,"6[1-9]\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TN":[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"(?:(?:3[0-2]|7\\d)\\d{3}|81200)\\d{3}",,,,"30010123"],[,,"(?:(?:[259]\\d|4[0-6])\\d\\d|3(?:001|1(?:[1-35]\\d|40)|240|(?:6[0-4]|91)\\d))\\d{4}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TO":[,[,,"(?:(?:080|[56])0|[2-4]\\d|[78]\\d(?:\\d{2})?)\\d{3}",,,,,,,[5,7]],[,,"(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:7[578]|8[46-9])\\d{5}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[2-6]|7[014]|8[05]"]],[,"(\\d{3})(\\d{4})","$1 $2",["7[578]|8"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TR":[,[,,"(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}",,,,,,,[7,10]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"5(?:(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{2}|6161)\\d{5}",,,,"5012345678",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,,,,,,,,[-1]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[02-69]|1[06])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["51|[89]"],"0$1",,1],[,"(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"],,,1]],,[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"444\\d{4}",,,,,,,[7]],[,,"444\\d{4}|850\\d{7}",,,,"4441444"],,,[,,,,,,,,,[-1]]],"TT":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"868(?:2(?:01|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:2(?:6[6-9]|[7-9]\\d)|[37](?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d))\\d{4}",,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],"TV":[,[,,"(?:2|7\\d\\d|90)\\d{4}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TW":[,[,,"(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",,,,,,,[7,8,9,10]],[,,"(?:2(?:[235-8]\\d{3}|4\\d{2,3})|3[2-9]\\d{2}|4(?:[239]\\d|[78])\\d{2}|5[2-8]\\d{2}|6[235-79]\\d{2}|7[1-9]\\d{2}|8(?:2(?:3\\d|66)|[7-9]\\d{2}))\\d{4}",,,,"221234567",,,[8,9]],[,,"9[0-8]\\d{7}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}",,,,"800123456",,,[9]],[,,"20(?:2|[013-9]\\d{2})\\d{4}",,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"TW",886,"0(?:0[25679]|19)","0","#",,"0",,,,[[,"(20)(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"([258]0)(\\d{3})(\\d{4})","$1 $2 $3",["20[013-9]|50[0-46-9]|80[0-79]"],"0$1"],[,"([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["[25][2-8]|[346]|[78][1-9]"],"0$1"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],[,"(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],"TZ":[,[,,"(?:[26-8]\\d|41|90)\\d{7}",,,,,,,[9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[2-9]|7[13-9])\\d{7}",,,,"621234567"],[,,"80[08]\\d{6}",,,,"800123456"],[,,"90\\d{7}",,,,"900123456"],[,,"8(?:40|6[01])\\d{6}",,,,"840123456"],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UA":[,[,,"[3-9]\\d{8}",,,,,,,[9],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,,[5,6,7]],[,,"(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}",,,,"391234567"],[,,"800\\d{6}",,,,"800123456"],[,,"900[2-49]\\d{5}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567"],"UA",380,"00","0",,,"0",,"0~0",,[[,"([3-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|[67][37])|6[36-8]|7|9[1-9]","[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"],"0$1"],[,"([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["(?:3[1-8]|4[136-8])2|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90"],"0$1"],[,"([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:[1-46-8]|5[013-9])|4(?:[137][013-9]|[45][6-9]|6|8[4-6])|5(?:[1245][013-9]|3|6[0135689]|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])","3(?:[1-46-8](?:[013-9]|22)|5[013-9])|4(?:[137][013-9]|[45][6-9]|6(?:[013-9]|22)|8[4-6])|5(?:[1245][013-9]|3|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UG":[,[,,"(?:(?:[29]0|[347]\\d)\\d|800)\\d{6}",,,,,,,[9],[5,6,7]],[,,"20(?:[0147]\\d{3}|2(?:40|[5-9]\\d)\\d|3(?:0[0-4]|[2367]\\d)\\d|5[0-4]\\d{2}|6(?:00[0-2]|30[0-4]|[5-9]\\d{2})|8[0-2]\\d{2})\\d{3}|[34]\\d{8}",,,,"312345678",,,,[5,6,7]],[,,"7(?:[0157-9]\\d{2}|2(?:[03]\\d|60)|30\\d|4[0-4]\\d)\\d{5}",,,,"712345678"],[,,"800[123]\\d{5}",,,,"800123456"],[,,"90[123]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1 $2",["20[0-8]|4(?:6[45]|[7-9])|[7-9]","20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])|[7-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"],"0$1"],[,"(2024)(\\d{5})","$1 $2",["202","2024"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"US":[,[,,"[2-9]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[2-9]"]]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"710[2-9]\\d{6}",,,,"7102123456"],,,[,,,,,,,,,[-1]]],"UY":[,[,,"(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",,,,,,,[7,8]],[,,"2\\d{7}|4[2-7]\\d{6}",,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"80[05]\\d{4}",,,,"8001234",,,[7]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:1[3-9]\\d|0)","0"," int. ",,"0",,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UZ":[,[,,"[679]\\d{8}",,,,,,,[9],[7]],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",,,,"669050123",,,,[7]],[,,"6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"810","8",,,"8",,"8~10",,[[,"([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[679]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VA":[,[,,"0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9,10,11]],[,,"06698\\d{1,6}",,,,"0669812345"],[,,"33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"06698",[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VC":[,[,,"(?:[58]\\d\\d|784|900)\\d{7}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VE":[,[,,"(?:(?:[24]\\d|50)\\d|[89]00)\\d{7}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[46])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",,"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VG":[,[,,"(?:284|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"284(?:(?:229|774|8(?:52|6[459]))\\d|4(?:22\\d|9(?:[45]\\d|6[0-5])))\\d{3}",,,,"2842291234",,,,[7]],[,,"284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|54[0-57])\\d|4(?:(?:4[0-6]|68)\\d|9(?:6[6-9]|9\\d)))\\d{3}",,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VI":[,[,,"(?:(?:34|90)0|[58]\\d\\d)\\d{7}",,,,,,,[10],[7]],[,,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VN":[,[,,"[12]\\d{9}|[135-9]\\d{8}|(?:[16]\\d?|[78])\\d{6}",,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-7]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:(?:1(?:2\\d|6[2-9]|8[68]|99)|3\\d|7[06-9])\\d|5(?:2[23]|[689]\\d)|8(?:[1-58]\\d|6[5689]|9[689])|9(?:[0-8]\\d|9[013-9]))\\d{6}",,,,"912345678",,,[9,10]],[,,"1800\\d{4,6}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:67|99)2\\d{6}",,,,"992012345",,,[9]],"VN",84,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{3})(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1[89]0"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,"(?:[17]99|69\\d\\d?)\\d{4}",,,,,,,[7,8]],[,,"(?:[17]99|69\\d\\d?|80\\d)\\d{4}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],"VU":[,[,,"(?:(?:[23]|[57]\\d\\d|900)\\d|[48]8)\\d{3}",,,,,,,[5,7]],[,,"(?:(?:2[02-9]|88)\\d|3(?:[5-7]\\d|8[0-8])|48[4-9])\\d\\d",,,,"22123",,,[5]],[,,"(?:5(?:[0-689]\\d|7[2-5])|7[013-7]\\d)\\d{4}",,,,"5912345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:3[03]|900\\d)\\d{3}",,,,"30123"],,,[,,,,,,,,,[-1]]],"WF":[,[,,"(?:[45]0|68|72|8\\d)\\d{4}",,,,,,,[6]],[,,"(?:50|68|72)\\d{4}",,,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}",,,,"501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234"]],"WS":[,[,,"(?:[2-6]|8\\d(?:\\d{4})?)\\d{4}|[78]\\d{6}",,,,,,,[5,6,7,10]],[,,"(?:[2-5]\\d|6[1-9])\\d{3}",,,,"22123",,,[5]],[,,"(?:7[25-7]|8(?:[3-7]|9\\d{3}))\\d{5}",,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(\\d{5})","$1",["[2-6]"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["8"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"XK":[,[,,"(?:[23]\\d{2,3}|4\\d\\d|[89]00)\\d{5}",,,,,,,[8,9]],[,,"(?:2[89]|39)0\\d{6}|[23][89]\\d{6}",,,,"28012345"],[,,"4[3-79]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"YE":[,[,,"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",,,,,,,[7,8,9],[6]],[,,"(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[0137]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"YT":[,[,,"(?:(?:26|63)9|80\\d)\\d{6}",,,,,,,[9]],[,,"269(?:0[67]|5[01]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",,,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"269|63",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ZA":[,[,,"[1-9]\\d{8}|8\\d{4,7}",,,,,,,[5,6,7,8,9]],[,,"(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:6\\d|7[0-46-9]|8[1-5])\\d{7}|8[1-4]\\d{3,6}",,,,"711234567"],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"(?:86[2-9]|9[0-2]\\d)\\d{6}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87\\d{7}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6}",,,,"861123456",,,[9]],,,[,,,,,,,,,[-1]]],"ZM":[,[,,"(?:(?:21|9\\d)\\d|800)\\d{6}",,,,,,,[9],[6,7]],[,,"21[1-8]\\d{6}",,,,"211234567",,,,[6,7]],[,,"9[4-9]\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",,"$1"],[,"([1-8])(\\d{2})(\\d{4})","$1 $2 $3",["[1-8]"],"$1"],[,"([29]\\d)(\\d{7})","$1 $2",["[29]"],"0$1"],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ZW":[,[,,"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:2(?:02[014]|[49]2\\d|[56]20|72[03])|3(?:123|92\\d)|5(?:42\\d|525)|6(?:[16-8]21|52[013])|8(?:[1349]28|523))\\d{5}|(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|37|6[78]|75\\d|98|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|[4-8]|9\\d)|2(?:0\\d{2}|12|292|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|1[2-4]|26|[37]2|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83\\d|2582\\d{2}|65[2-8])\\d{2}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",,,,"1312345",,,,[3,4]],[,,"(?:7(?:1\\d|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}",,,,"712345678",,,[9,10]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|30|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{7})","($1) $2",["(?:2[04-79]|39|5[45]|6[15-8]|8[13-59])2","2(?:02[014]|[49]2|[56]20|72[03])|392|5(?:42|525)|6(?:[16-8]21|52[013])|8(?:[1349]28|523)"],"0$1"],[,"([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"],"0$1"],[,"(7\\d)(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"],"0$1"],[,"([2356]\\d{2})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8|[78])|3(?:[09]8|17|3[78]|7[1569]|8[37])|5[15][78]|6(?:[29]8|37|[68][78]|75)"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"],"0$1"],[,"([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[02569]|3[0-69]|5[05689]|6"],"0$1"],[,"([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"],"0$1"],[,"([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"],"0$1"],[,"(8\\d{3})(\\d{6})","$1 $2",["86"],"0$1"],[,"(80\\d)(\\d{4})","$1 $2",["80"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"800":[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"808":[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"870":[,[,,"[35-7]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"(?:[356]\\d|7[6-8])\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[35-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"878":[,[,,"10\\d{10}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"881":[,[,,"[67]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"[67]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"882":[,[,,"[13]\\d{6}(?:\\d{2,5})?|1\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"3(?:(?:2\\d|37)\\d\\d|4(?:2|7\\d{3}))\\d{4}",,,,"3421234",,,[7,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])|6\\d{1,6})|3(?:45|9\\d{3})\\d{3})\\d{4}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],"883":[,[,,"51\\d{7}(?:\\d{3})?",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"51[013]0\\d{8}|5100\\d{5}",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"888":[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],"979":[,[,,"\\d{9}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{9}",,,,"123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]]};
/*
metadata.js
*/

/*phonenumberutil.js
 */
i18n.phonenumbers.PhoneNumberUtil = function() {
    this.regionToMetadataMap = {};
};
goog.addSingletonGetter(i18n.phonenumbers.PhoneNumberUtil);
i18n.phonenumbers.Error = {
    INVALID_COUNTRY_CODE: 'Invalid country calling code',
    NOT_A_NUMBER: 'The string supplied did not seem to be a phone number',
    TOO_SHORT_AFTER_IDD: 'Phone number too short after IDD',
    TOO_SHORT_NSN: 'The string supplied is too short to be a phone number',
    TOO_LONG: 'The string supplied is too long to be a phone number'
};
i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_ = 1;
i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_ = 2;
i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_FOR_NSN_ = 17;
i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_COUNTRY_CODE_ = 3;
i18n.phonenumbers.PhoneNumberUtil.MAX_INPUT_STRING_LENGTH_ = 250;
i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_ = 'ZZ';
i18n.phonenumbers.PhoneNumberUtil.COLOMBIA_MOBILE_TO_FIXED_LINE_PREFIX_ = '3';
i18n.phonenumbers.PhoneNumberUtil.MOBILE_TOKEN_MAPPINGS_ = {
    52: '1',
    54: '9'
};
i18n.phonenumbers.PhoneNumberUtil.GEO_MOBILE_COUNTRIES_ = [
    52,     54,     55   ];
i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN = '+';
i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ = '*';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ = ';ext=';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_ = 'tel:';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_ = ';phone-context=';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_ISDN_SUBADDRESS_ = ';isub=';
i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '\uFF10': '0',    '\uFF11': '1',    '\uFF12': '2',    '\uFF13': '3',    '\uFF14': '4',    '\uFF15': '5',    '\uFF16': '6',    '\uFF17': '7',    '\uFF18': '8',    '\uFF19': '9',    '\u0660': '0',    '\u0661': '1',    '\u0662': '2',    '\u0663': '3',    '\u0664': '4',    '\u0665': '5',    '\u0666': '6',    '\u0667': '7',    '\u0668': '8',    '\u0669': '9',    '\u06F0': '0',    '\u06F1': '1',    '\u06F2': '2',    '\u06F3': '3',    '\u06F4': '4',    '\u06F5': '5',    '\u06F6': '6',    '\u06F7': '7',    '\u06F8': '8',    '\u06F9': '9'   };
i18n.phonenumbers.PhoneNumberUtil.DIALLABLE_CHAR_MAPPINGS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN,
    '*': '*',
    '#': '#'
};
i18n.phonenumbers.PhoneNumberUtil.ALPHA_MAPPINGS_ = {
    'A': '2',
    'B': '2',
    'C': '2',
    'D': '3',
    'E': '3',
    'F': '3',
    'G': '4',
    'H': '4',
    'I': '4',
    'J': '5',
    'K': '5',
    'L': '5',
    'M': '6',
    'N': '6',
    'O': '6',
    'P': '7',
    'Q': '7',
    'R': '7',
    'S': '7',
    'T': '8',
    'U': '8',
    'V': '8',
    'W': '9',
    'X': '9',
    'Y': '9',
    'Z': '9'
};
i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '\uFF10': '0',    '\uFF11': '1',    '\uFF12': '2',    '\uFF13': '3',    '\uFF14': '4',    '\uFF15': '5',    '\uFF16': '6',    '\uFF17': '7',    '\uFF18': '8',    '\uFF19': '9',    '\u0660': '0',    '\u0661': '1',    '\u0662': '2',    '\u0663': '3',    '\u0664': '4',    '\u0665': '5',    '\u0666': '6',    '\u0667': '7',    '\u0668': '8',    '\u0669': '9',    '\u06F0': '0',    '\u06F1': '1',    '\u06F2': '2',    '\u06F3': '3',    '\u06F4': '4',    '\u06F5': '5',    '\u06F6': '6',    '\u06F7': '7',    '\u06F8': '8',    '\u06F9': '9',    'A': '2',
    'B': '2',
    'C': '2',
    'D': '3',
    'E': '3',
    'F': '3',
    'G': '4',
    'H': '4',
    'I': '4',
    'J': '5',
    'K': '5',
    'L': '5',
    'M': '6',
    'N': '6',
    'O': '6',
    'P': '7',
    'Q': '7',
    'R': '7',
    'S': '7',
    'T': '8',
    'U': '8',
    'V': '8',
    'W': '9',
    'X': '9',
    'Y': '9',
    'Z': '9'
};
i18n.phonenumbers.PhoneNumberUtil.ALL_PLUS_NUMBER_GROUPING_SYMBOLS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'i': 'I',
    'j': 'J',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'o': 'O',
    'p': 'P',
    'q': 'Q',
    'r': 'R',
    's': 'S',
    't': 'T',
    'u': 'U',
    'v': 'V',
    'w': 'W',
    'x': 'X',
    'y': 'Y',
    'z': 'Z',
    '-': '-',
    '\uFF0D': '-',
    '\u2010': '-',
    '\u2011': '-',
    '\u2012': '-',
    '\u2013': '-',
    '\u2014': '-',
    '\u2015': '-',
    '\u2212': '-',
    '/': '/',
    '\uFF0F': '/',
    ' ': ' ',
    '\u3000': ' ',
    '\u2060': ' ',
    '.': '.',
    '\uFF0E': '.'
};
i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_ =
    /[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/;
i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION =
    '-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \u00A0\u00AD\u200B\u2060\u3000' +
    '()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E';
i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ =
    '0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9';
i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ = 'A-Za-z';
i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ = '+\uFF0B';
i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_PATTERN =
    new RegExp('[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']+');
i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN =
    new RegExp('^[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']+');
i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']+';
i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN =
    new RegExp('([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + '])');
i18n.phonenumbers.PhoneNumberUtil.VALID_START_CHAR_PATTERN_ =
    new RegExp('[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ +
        i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']');
i18n.phonenumbers.PhoneNumberUtil.SECOND_NUMBER_START_PATTERN_ = /[\\\/] *x/;
i18n.phonenumbers.PhoneNumberUtil.UNWANTED_END_CHAR_PATTERN_ =
    new RegExp('[^' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ +
        i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ + '#]+$');
i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_ =
    /(?:.*?[A-Za-z]){3}.*/;
i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_PHONE_NUMBER_PATTERN_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{' +
    i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_ + '}';
i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']*(?:[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION +
    i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ + ']*[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']){3,}[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION +
    i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ +
    i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ +
    i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']*';
i18n.phonenumbers.PhoneNumberUtil.DEFAULT_EXTN_PREFIX_ = ' ext. ';
i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ =
    '([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{1,7})';
i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ =
    i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ +
    i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ + '|' +
    '[ \u00A0\\t,]*' +
    '(?:e?xt(?:ensi(?:o\u0301?|\u00F3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|' +
    '\u0434\u043E\u0431|' +
    '[;,x\uFF58#\uFF03~\uFF5E]|int|anexo|\uFF49\uFF4E\uFF54)' +
    '[:\\.\uFF0E]?[ \u00A0\\t,-]*' +
    i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ + '#?|' +
    '[- ]+([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{1,5})#';
i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_ =
    new RegExp('(?:' +
        i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ +
        ')$', 'i');
i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_PATTERN_ =
    new RegExp(
        '^' +
        i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_PHONE_NUMBER_PATTERN_ +
        '$|' +
        '^' + i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_ +
        '(?:' + i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ +
        ')?' + '$', 'i');
i18n.phonenumbers.PhoneNumberUtil.NON_DIGITS_PATTERN_ = /\D+/;
i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_ = /(\$\d)/;
i18n.phonenumbers.PhoneNumberUtil.NP_PATTERN_ = /\$NP/;
i18n.phonenumbers.PhoneNumberUtil.FG_PATTERN_ = /\$FG/;
i18n.phonenumbers.PhoneNumberUtil.CC_PATTERN_ = /\$CC/;
i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_ONLY_PREFIX_PATTERN_ =
    /^\(?\$1\)?$/;
i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY = '001';
i18n.phonenumbers.PhoneNumberFormat = {
    E164: 0,
    INTERNATIONAL: 1,
    NATIONAL: 2,
    RFC3966: 3
};
i18n.phonenumbers.PhoneNumberType = {
    FIXED_LINE: 0,
    MOBILE: 1,
    FIXED_LINE_OR_MOBILE: 2,
    TOLL_FREE: 3,
    PREMIUM_RATE: 4,
    SHARED_COST: 5,
    VOIP: 6,
    PERSONAL_NUMBER: 7,
    PAGER: 8,
    UAN: 9,
    VOICEMAIL: 10,
    UNKNOWN: -1
};
i18n.phonenumbers.PhoneNumberUtil.MatchType = {
    NOT_A_NUMBER: 0,
    NO_MATCH: 1,
    SHORT_NSN_MATCH: 2,
    NSN_MATCH: 3,
    EXACT_MATCH: 4
};
i18n.phonenumbers.PhoneNumberUtil.ValidationResult = {
    IS_POSSIBLE: 0,
    IS_POSSIBLE_LOCAL_ONLY: 4,
    INVALID_COUNTRY_CODE: 1,
    TOO_SHORT: 2,
    INVALID_LENGTH: 5,
    TOO_LONG: 3
};
i18n.phonenumbers.PhoneNumberUtil.extractPossibleNumber = function(number) {
    var possibleNumber;
    var start = number
        .search(i18n.phonenumbers.PhoneNumberUtil.VALID_START_CHAR_PATTERN_);
    if (start >= 0) {
        possibleNumber = number.substring(start);
        possibleNumber = possibleNumber.replace(
            i18n.phonenumbers.PhoneNumberUtil.UNWANTED_END_CHAR_PATTERN_, '');
        var secondNumberStart = possibleNumber
            .search(i18n.phonenumbers.PhoneNumberUtil.SECOND_NUMBER_START_PATTERN_);
        if (secondNumberStart >= 0) {
            possibleNumber = possibleNumber.substring(0, secondNumberStart);
        }
    } else {
        possibleNumber = '';
    }
    return possibleNumber;
};
i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber = function(number) {
    if (number.length < i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
        return false;
    }
    return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
        i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_PATTERN_, number);
};
i18n.phonenumbers.PhoneNumberUtil.normalize = function(number) {
    if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
            i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_, number)) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_, true);
    } else {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(number);
    }
};
i18n.phonenumbers.PhoneNumberUtil.normalizeSB_ = function(number) {
    var normalizedNumber = i18n.phonenumbers.PhoneNumberUtil.normalize(number
        .toString());
    number.clear();
    number.append(normalizedNumber);
};
i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly = function(number) {
    return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
        i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS, true);
};
i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly =
    function(number) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.DIALLABLE_CHAR_MAPPINGS_,
            true  );
    };
i18n.phonenumbers.PhoneNumberUtil.convertAlphaCharactersInNumber =
    function(number) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_, false);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getLengthOfGeographicalAreaCode =
    function(number) {
        var metadata = this.getMetadataForRegion(this.getRegionCodeForNumber(number));
        if (metadata == null) {
            return 0;
        }
        if (!metadata.hasNationalPrefix() && !number.hasItalianLeadingZero()) {
            return 0;
        }
        if (!this.isNumberGeographical(number)) {
            return 0;
        }
        return this.getLengthOfNationalDestinationCode(number);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getLengthOfNationalDestinationCode =
    function(number) {
        var copiedProto;
        if (number.hasExtension()) {
            copiedProto = number.clone();
            copiedProto.clearExtension();
        } else {
            copiedProto = number;
        }
        var nationalSignificantNumber = this.format(copiedProto,
            i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        var numberGroups = nationalSignificantNumber.split(
            i18n.phonenumbers.PhoneNumberUtil.NON_DIGITS_PATTERN_);
        if (numberGroups[0].length == 0) {
            numberGroups.shift();
        }
        if (numberGroups.length <= 2) {
            return 0;
        }
        if (this.getNumberType(number) == i18n.phonenumbers.PhoneNumberType.MOBILE) {
            var mobileToken = i18n.phonenumbers.PhoneNumberUtil.getCountryMobileToken(
                number.getCountryCodeOrDefault());
            if (mobileToken != '') {
                return numberGroups[2].length + mobileToken.length;
            }
        }
        return numberGroups[1].length;
    };
i18n.phonenumbers.PhoneNumberUtil.getCountryMobileToken =
    function(countryCallingCode) {
        return i18n.phonenumbers.PhoneNumberUtil.MOBILE_TOKEN_MAPPINGS_[
            countryCallingCode] || '';
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedRegions = function() {
    return goog.array.filter(
        Object.keys(i18n.phonenumbers.metadata.countryToMetadata),
        function(regionCode) {
            return isNaN(regionCode);
        });
};
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getSupportedGlobalNetworkCallingCodes = function() {
    var callingCodesAsStrings = goog.array.filter(
        Object.keys(i18n.phonenumbers.metadata.countryToMetadata),
        function(regionCode) {
            return !isNaN(regionCode);
        });
    return goog.array.map(callingCodesAsStrings,
        function(callingCode) {
            return parseInt(callingCode, 10);
        });
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedCallingCodes =
    function() {
        var countryCodesAsStrings =
            Object.keys(i18n.phonenumbers.metadata.countryCodeToRegionCodeMap);
        return goog.array.join(
            this.getSupportedGlobalNetworkCallingCodes(),
            goog.array.map(countryCodesAsStrings,
                function(callingCode) {
                    return parseInt(callingCode, 10);
                }));
    };
i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_ = function(desc) {
    return desc != null &&
        (desc.possibleLengthCount() != 1 || desc.possibleLengthArray()[0] != -1);
};
i18n.phonenumbers.PhoneNumberUtil.descHasData_ = function(desc) {
    return desc != null && (desc.hasExampleNumber() ||
        i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(desc) ||
        desc.hasNationalNumberPattern());
};
i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_ =
    function(metadata) {
        var types = [];
        goog.object.forEach(i18n.phonenumbers.PhoneNumberType,
            function(type) {
                if (type == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE ||
                    type == i18n.phonenumbers.PhoneNumberType.UNKNOWN) {
                    return;
                }
                var desc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                    metadata, type);
                if (i18n.phonenumbers.PhoneNumberUtil.descHasData_(desc)) {
                    types.push(type);
                }
            });
        return types;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedTypesForRegion =
    function(regionCode) {
        if (!this.isValidRegionCode_(regionCode)) {
            return [];
        }
        return i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_(
            (
                this.getMetadataForRegion(regionCode)));
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedTypesForNonGeoEntity =
    function(countryCallingCode) {
        var metadata = this.getMetadataForNonGeographicalRegion(countryCallingCode);
        if (metadata == null) {
            return [];
        }
        return i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_(
            (metadata));
    };
i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_ =
    function(number, normalizationReplacements, removeNonMatches) {
        var normalizedNumber = new goog.string.StringBuffer();
        var character;
        var newDigit;
        var numberLength = number.length;
        for (var i = 0; i < numberLength; ++i) {
            character = number.charAt(i);
            newDigit = normalizationReplacements[character.toUpperCase()];
            if (newDigit != null) {
                normalizedNumber.append(newDigit);
            } else if (!removeNonMatches) {
                normalizedNumber.append(character);
            }
        }
        return normalizedNumber.toString();
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formattingRuleHasFirstGroupOnly =
    function(nationalPrefixFormattingRule) {
        return nationalPrefixFormattingRule.length == 0 ||
            i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_ONLY_PREFIX_PATTERN_.
            test(nationalPrefixFormattingRule);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberGeographical =
    function(phoneNumber) {
        var numberType = this.getNumberType(phoneNumber);
        return numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE ||
            numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE ||
            (goog.array.contains(
                i18n.phonenumbers.PhoneNumberUtil.GEO_MOBILE_COUNTRIES_,
                phoneNumber.getCountryCodeOrDefault()) &&
                numberType == i18n.phonenumbers.PhoneNumberType.MOBILE);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidRegionCode_ =
    function(regionCode) {
        return regionCode != null &&
            isNaN(regionCode) &&
            regionCode.toUpperCase() in i18n.phonenumbers.metadata.countryToMetadata;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.hasValidCountryCallingCode_ =
    function(countryCallingCode) {
        return countryCallingCode in
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.format =
    function(number, numberFormat) {
        if (number.getNationalNumber() == 0 && number.hasRawInput()) {
            var rawInput = number.getRawInputOrDefault();
            if (rawInput.length > 0) {
                return rawInput;
            }
        }
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.E164) {
            return this.prefixNumberWithCountryCallingCode_(
                countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.E164,
                nationalSignificantNumber, '');
        }
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedExtension =
            this.maybeGetFormattedExtension_(number, metadata, numberFormat);
        var formattedNationalNumber =
            this.formatNsn_(nationalSignificantNumber, metadata, numberFormat);
        return this.prefixNumberWithCountryCallingCode_(countryCallingCode,
            numberFormat,
            formattedNationalNumber,
            formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatByPattern =
    function(number, numberFormat, userDefinedFormats) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedNumber = '';
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            userDefinedFormats, nationalSignificantNumber);
        if (formattingPattern == null) {
            formattedNumber = nationalSignificantNumber;
        } else {
            var numFormatCopy = formattingPattern.clone();
            var nationalPrefixFormattingRule =
                formattingPattern.getNationalPrefixFormattingRuleOrDefault();
            if (nationalPrefixFormattingRule.length > 0) {
                var nationalPrefix = metadata.getNationalPrefixOrDefault();
                if (nationalPrefix.length > 0) {
                    nationalPrefixFormattingRule = nationalPrefixFormattingRule
                        .replace(i18n.phonenumbers.PhoneNumberUtil.NP_PATTERN_,
                            nationalPrefix)
                        .replace(i18n.phonenumbers.PhoneNumberUtil.FG_PATTERN_, '$1');
                    numFormatCopy.setNationalPrefixFormattingRule(
                        nationalPrefixFormattingRule);
                } else {
                    numFormatCopy.clearNationalPrefixFormattingRule();
                }
            }
            formattedNumber = this.formatNsnUsingPattern_(
                nationalSignificantNumber, numFormatCopy, numberFormat);
        }
        var formattedExtension =
            this.maybeGetFormattedExtension_(number, metadata, numberFormat);
        return this.prefixNumberWithCountryCallingCode_(countryCallingCode,
            numberFormat,
            formattedNumber,
            formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatNationalNumberWithCarrierCode = function(number, carrierCode) {
    var countryCallingCode = number.getCountryCodeOrDefault();
    var nationalSignificantNumber = this.getNationalSignificantNumber(number);
    if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
        return nationalSignificantNumber;
    }
    var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
    var metadata =
        this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
    var formattedExtension = this.maybeGetFormattedExtension_(
        number, metadata, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
    var formattedNationalNumber = this.formatNsn_(
        nationalSignificantNumber, metadata,
        i18n.phonenumbers.PhoneNumberFormat.NATIONAL, carrierCode);
    return this.prefixNumberWithCountryCallingCode_(
        countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.NATIONAL,
        formattedNationalNumber, formattedExtension);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getMetadataForRegionOrCallingCode_ =
    function(countryCallingCode, regionCode) {
        return i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ==
        regionCode ?
            this.getMetadataForNonGeographicalRegion(countryCallingCode) :
            this.getMetadataForRegion(regionCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatNationalNumberWithPreferredCarrierCode = function(
    number, fallbackCarrierCode) {
    return this.formatNationalNumberWithCarrierCode(
        number,
        number.getPreferredDomesticCarrierCodeOrDefault().length > 0 ?
            number.getPreferredDomesticCarrierCodeOrDefault() :
            fallbackCarrierCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNumberForMobileDialing =
    function(number, regionCallingFrom, withFormatting) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return number.hasRawInput() ? number.getRawInputOrDefault() : '';
        }
        var formattedNumber = '';
        var numberNoExt = number.clone();
        numberNoExt.clearExtension();
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var numberType = this.getNumberType(numberNoExt);
        var isValidNumber = (numberType != i18n.phonenumbers.PhoneNumberType.UNKNOWN);
        if (regionCallingFrom == regionCode) {
            var isFixedLineOrMobile =
                (numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE) ||
                (numberType == i18n.phonenumbers.PhoneNumberType.MOBILE) ||
                (numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE);
            if (regionCode == 'CO' &&
                numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE) {
                formattedNumber = this.formatNationalNumberWithCarrierCode(
                    numberNoExt,
                    i18n.phonenumbers.PhoneNumberUtil
                        .COLOMBIA_MOBILE_TO_FIXED_LINE_PREFIX_);
            } else if (regionCode == 'BR' && isFixedLineOrMobile) {
                formattedNumber =
                    numberNoExt.getPreferredDomesticCarrierCodeOrDefault().length > 0 ?
                        this.formatNationalNumberWithPreferredCarrierCode(numberNoExt, '') :
                        '';
            } else if (isValidNumber && regionCode == 'HU') {
                formattedNumber =
                    this.getNddPrefixForRegion(regionCode, true  ) +
                    ' ' + this.format(numberNoExt,
                    i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
            } else if (countryCallingCode ==
                i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
                var regionMetadata = this.getMetadataForRegion(regionCallingFrom);
                if (this.canBeInternationallyDialled(numberNoExt) &&
                    this.testNumberLength_(this.getNationalSignificantNumber(numberNoExt),
                        regionMetadata) !=
                    i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT) {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                } else {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                }
            } else {
                if ((regionCode ==
                        i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ||
                        ((regionCode == 'MX' || regionCode == 'CL' || regionCode == 'UZ') &&
                            isFixedLineOrMobile)) &&
                    this.canBeInternationallyDialled(numberNoExt)) {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                } else {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                }
            }
        } else if (isValidNumber && this.canBeInternationallyDialled(numberNoExt)) {
            return withFormatting ?
                this.format(numberNoExt,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL) :
                this.format(numberNoExt, i18n.phonenumbers.PhoneNumberFormat.E164);
        }
        return withFormatting ?
            formattedNumber :
            i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(
                formattedNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatOutOfCountryCallingNumber =
    function(number, regionCallingFrom) {
        if (!this.isValidRegionCode_(regionCallingFrom)) {
            return this.format(number,
                i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        }
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        if (countryCallingCode ==
            i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
            if (this.isNANPACountry(regionCallingFrom)) {
                return countryCallingCode + ' ' +
                    this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
            }
        } else if (countryCallingCode ==
            this.getCountryCodeForValidRegion_(regionCallingFrom)) {
            return this.format(number,
                i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
        }
        var metadataForRegionCallingFrom =
            this.getMetadataForRegion(regionCallingFrom);
        var internationalPrefix =
            metadataForRegionCallingFrom.getInternationalPrefixOrDefault();
        var internationalPrefixForFormatting = '';
        if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_,
                internationalPrefix)) {
            internationalPrefixForFormatting = internationalPrefix;
        } else if (metadataForRegionCallingFrom.hasPreferredInternationalPrefix()) {
            internationalPrefixForFormatting =
                metadataForRegionCallingFrom.getPreferredInternationalPrefixOrDefault();
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadataForRegion =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedNationalNumber = this.formatNsn_(
            nationalSignificantNumber, metadataForRegion,
            i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        var formattedExtension = this.maybeGetFormattedExtension_(number,
            metadataForRegion, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        return internationalPrefixForFormatting.length > 0 ?
            internationalPrefixForFormatting + ' ' + countryCallingCode + ' ' +
            formattedNationalNumber + formattedExtension :
            this.prefixNumberWithCountryCallingCode_(
                countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL,
                formattedNationalNumber, formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatInOriginalFormat =
    function(number, regionCallingFrom) {
        if (number.hasRawInput() && !this.hasFormattingPatternForNumber_(number)) {
            return number.getRawInputOrDefault();
        }
        if (!number.hasCountryCodeSource()) {
            return this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
        }
        var formattedNumber;
        switch (number.getCountryCodeSource()) {
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource
                .FROM_NUMBER_WITH_PLUS_SIGN:
                formattedNumber = this.format(number,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_NUMBER_WITH_IDD:
                formattedNumber =
                    this.formatOutOfCountryCallingNumber(number, regionCallingFrom);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource
                .FROM_NUMBER_WITHOUT_PLUS_SIGN:
                formattedNumber = this.format(number,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL).substring(1);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY:
            default:
                var regionCode =
                    this.getRegionCodeForCountryCode(number.getCountryCodeOrDefault());
                var nationalPrefix = this.getNddPrefixForRegion(regionCode, true);
                var nationalFormat =
                    this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                if (nationalPrefix == null || nationalPrefix.length == 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                if (this.rawInputContainsNationalPrefix_(
                        number.getRawInputOrDefault(), nationalPrefix, regionCode)) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var metadata = this.getMetadataForRegion(regionCode);
                var nationalNumber = this.getNationalSignificantNumber(number);
                var formatRule = this.chooseFormattingPatternForNumber_(
                    metadata.numberFormatArray(), nationalNumber);
                if (formatRule == null) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var candidateNationalPrefixRule =
                    formatRule.getNationalPrefixFormattingRuleOrDefault();
                var indexOfFirstGroup = candidateNationalPrefixRule.indexOf('$1');
                if (indexOfFirstGroup <= 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                candidateNationalPrefixRule =
                    candidateNationalPrefixRule.substring(0, indexOfFirstGroup);
                candidateNationalPrefixRule = i18n.phonenumbers.PhoneNumberUtil
                    .normalizeDigitsOnly(candidateNationalPrefixRule);
                if (candidateNationalPrefixRule.length == 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var numFormatCopy = formatRule.clone();
                numFormatCopy.clearNationalPrefixFormattingRule();
                formattedNumber = this.formatByPattern(number,
                    i18n.phonenumbers.PhoneNumberFormat.NATIONAL, [numFormatCopy]);
                break;
        }
        var rawInput = number.getRawInputOrDefault();
        if (formattedNumber != null && rawInput.length > 0) {
            var normalizedFormattedNumber =
                i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(
                    formattedNumber);
            var normalizedRawInput =
                i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(rawInput);
            if (normalizedFormattedNumber != normalizedRawInput) {
                formattedNumber = rawInput;
            }
        }
        return formattedNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.rawInputContainsNationalPrefix_ =
    function(rawInput, nationalPrefix, regionCode) {
        var normalizedNationalNumber =
            i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(rawInput);
        if (goog.string.startsWith(normalizedNationalNumber, nationalPrefix)) {
            try {
                return this.isValidNumber(
                    this.parse(normalizedNationalNumber.substring(nationalPrefix.length),
                        regionCode));
            } catch (e) {
                return false;
            }
        }
        return false;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.hasFormattingPatternForNumber_ =
    function(number) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        var phoneNumberRegion = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata = this.getMetadataForRegionOrCallingCode_(
            countryCallingCode, phoneNumberRegion);
        if (metadata == null) {
            return false;
        }
        var nationalNumber = this.getNationalSignificantNumber(number);
        var formatRule = this.chooseFormattingPatternForNumber_(
            metadata.numberFormatArray(), nationalNumber);
        return formatRule != null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatOutOfCountryKeepingAlphaChars = function(number, regionCallingFrom) {
    var rawInput = number.getRawInputOrDefault();
    if (rawInput.length == 0) {
        return this.formatOutOfCountryCallingNumber(number, regionCallingFrom);
    }
    var countryCode = number.getCountryCodeOrDefault();
    if (!this.hasValidCountryCallingCode_(countryCode)) {
        return rawInput;
    }
    rawInput = i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(
        rawInput,
        i18n.phonenumbers.PhoneNumberUtil.ALL_PLUS_NUMBER_GROUPING_SYMBOLS_,
        true);
    var nationalNumber = this.getNationalSignificantNumber(number);
    if (nationalNumber.length > 3) {
        var firstNationalNumberDigit =
            rawInput.indexOf(nationalNumber.substring(0, 3));
        if (firstNationalNumberDigit != -1) {
            rawInput = rawInput.substring(firstNationalNumberDigit);
        }
    }
    var metadataForRegionCallingFrom =
        this.getMetadataForRegion(regionCallingFrom);
    if (countryCode == i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
        if (this.isNANPACountry(regionCallingFrom)) {
            return countryCode + ' ' + rawInput;
        }
    } else if (metadataForRegionCallingFrom != null &&
        countryCode == this.getCountryCodeForValidRegion_(regionCallingFrom)) {
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            metadataForRegionCallingFrom.numberFormatArray(), nationalNumber);
        if (formattingPattern == null) {
            return rawInput;
        }
        var newFormat = formattingPattern.clone();
        newFormat.setPattern('(\\d+)(.*)');
        newFormat.setFormat('$1$2');
        return this.formatNsnUsingPattern_(rawInput, newFormat,
            i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
    }
    var internationalPrefixForFormatting = '';
    if (metadataForRegionCallingFrom != null) {
        var internationalPrefix =
            metadataForRegionCallingFrom.getInternationalPrefixOrDefault();
        internationalPrefixForFormatting =
            i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_,
                internationalPrefix) ?
                internationalPrefix :
                metadataForRegionCallingFrom.getPreferredInternationalPrefixOrDefault();
    }
    var regionCode = this.getRegionCodeForCountryCode(countryCode);
    var metadataForRegion =
        this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
    var formattedExtension = this.maybeGetFormattedExtension_(
        number, metadataForRegion,
        i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
    if (internationalPrefixForFormatting.length > 0) {
        return internationalPrefixForFormatting + ' ' + countryCode + ' ' +
            rawInput + formattedExtension;
    } else {
        return this.prefixNumberWithCountryCallingCode_(
            countryCode, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL,
            rawInput, formattedExtension);
    }
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getNationalSignificantNumber =
    function(number) {
        if (!number.hasNationalNumber()) {
            return '';
        }
        var nationalNumber = '' + number.getNationalNumber();
        if (number.hasItalianLeadingZero() && number.getItalianLeadingZero() &&
            number.getNumberOfLeadingZerosOrDefault() > 0) {
            return Array(number.getNumberOfLeadingZerosOrDefault() + 1).join('0') +
                nationalNumber;
        }
        return nationalNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    prefixNumberWithCountryCallingCode_ = function(countryCallingCode,
                                                   numberFormat,
                                                   formattedNationalNumber,
                                                   formattedExtension) {
    switch (numberFormat) {
        case i18n.phonenumbers.PhoneNumberFormat.E164:
            return i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL:
            return i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                ' ' + formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.RFC3966:
            return i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_ +
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                '-' + formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.NATIONAL:
        default:
            return formattedNationalNumber + formattedExtension;
    }
};
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNsn_ =
    function(number, metadata, numberFormat, opt_carrierCode) {
        var intlNumberFormats = metadata.intlNumberFormatArray();
        var availableFormats =
            (intlNumberFormats.length == 0 ||
                numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL) ?
                metadata.numberFormatArray() : metadata.intlNumberFormatArray();
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            availableFormats, number);
        return (formattingPattern == null) ?
            number :
            this.formatNsnUsingPattern_(number, formattingPattern,
                numberFormat, opt_carrierCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.chooseFormattingPatternForNumber_ =
    function(availableFormats, nationalNumber) {
        var numFormat;
        var l = availableFormats.length;
        for (var i = 0; i < l; ++i) {
            numFormat = availableFormats[i];
            var size = numFormat.leadingDigitsPatternCount();
            if (size == 0 ||
                nationalNumber
                    .search(numFormat.getLeadingDigitsPattern(size - 1)) == 0) {
                var patternToMatch = new RegExp(numFormat.getPattern());
                if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(patternToMatch,
                        nationalNumber)) {
                    return numFormat;
                }
            }
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNsnUsingPattern_ =
    function(nationalNumber, formattingPattern, numberFormat, opt_carrierCode) {
        var numberFormatRule = formattingPattern.getFormatOrDefault();
        var patternToMatch = new RegExp(formattingPattern.getPattern());
        var domesticCarrierCodeFormattingRule =
            formattingPattern.getDomesticCarrierCodeFormattingRuleOrDefault();
        var formattedNationalNumber = '';
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL &&
            opt_carrierCode != null && opt_carrierCode.length > 0 &&
            domesticCarrierCodeFormattingRule.length > 0) {
            var carrierCodeFormattingRule = domesticCarrierCodeFormattingRule
                .replace(i18n.phonenumbers.PhoneNumberUtil.CC_PATTERN_,
                    opt_carrierCode);
            numberFormatRule = numberFormatRule.replace(
                i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_,
                carrierCodeFormattingRule);
            formattedNationalNumber =
                nationalNumber.replace(patternToMatch, numberFormatRule);
        } else {
            var nationalPrefixFormattingRule =
                formattingPattern.getNationalPrefixFormattingRuleOrDefault();
            if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL &&
                nationalPrefixFormattingRule != null &&
                nationalPrefixFormattingRule.length > 0) {
                formattedNationalNumber = nationalNumber.replace(patternToMatch,
                    numberFormatRule.replace(
                        i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_,
                        nationalPrefixFormattingRule));
            } else {
                formattedNationalNumber =
                    nationalNumber.replace(patternToMatch, numberFormatRule);
            }
        }
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.RFC3966) {
            formattedNationalNumber = formattedNationalNumber.replace(
                new RegExp('^' + i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_),
                '');
            formattedNationalNumber = formattedNationalNumber.replace(
                new RegExp(i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_, 'g'),
                '-');
        }
        return formattedNationalNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumber =
    function(regionCode) {
        return this.getExampleNumberForType(regionCode,
            i18n.phonenumbers.PhoneNumberType.FIXED_LINE);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumberForType =
    function(regionCode, type) {
        if (!this.isValidRegionCode_(regionCode)) {
            return null;
        }
        var desc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
            this.getMetadataForRegion(regionCode), type);
        try {
            if (desc.hasExampleNumber()) {
                return this.parse(desc.getExampleNumber(), regionCode);
            }
        } catch (e) {
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumberForNonGeoEntity =
    function(countryCallingCode) {
        var metadata =
            this.getMetadataForNonGeographicalRegion(countryCallingCode);
        if (metadata != null) {
            var numberTypeWithExampleNumber = goog.array.find(
                [metadata.getMobile(), metadata.getTollFree(),
                    metadata.getSharedCost(), metadata.getVoip(),
                    metadata.getVoicemail(), metadata.getUan(),
                    metadata.getPremiumRate()],
                function(desc, index) {
                    return (desc.hasExampleNumber());
                });
            if (numberTypeWithExampleNumber != null) {
                try {
                    return this.parse('+' + countryCallingCode +
                        numberTypeWithExampleNumber.getExampleNumber(), 'ZZ');
                } catch (e) {
                }
            }
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeGetFormattedExtension_ =
    function(number, metadata, numberFormat) {
        if (!number.hasExtension() || number.getExtension().length == 0) {
            return '';
        } else {
            if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.RFC3966) {
                return i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ +
                    number.getExtension();
            } else {
                if (metadata.hasPreferredExtnPrefix()) {
                    return metadata.getPreferredExtnPrefix() +
                        number.getExtensionOrDefault();
                } else {
                    return i18n.phonenumbers.PhoneNumberUtil.DEFAULT_EXTN_PREFIX_ +
                        number.getExtensionOrDefault();
                }
            }
        }
    };
i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_ =
    function(metadata, type) {
        switch (type) {
            case i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE:
                return metadata.getPremiumRate();
            case i18n.phonenumbers.PhoneNumberType.TOLL_FREE:
                return metadata.getTollFree();
            case i18n.phonenumbers.PhoneNumberType.MOBILE:
                return metadata.getMobile();
            case i18n.phonenumbers.PhoneNumberType.FIXED_LINE:
            case i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE:
                return metadata.getFixedLine();
            case i18n.phonenumbers.PhoneNumberType.SHARED_COST:
                return metadata.getSharedCost();
            case i18n.phonenumbers.PhoneNumberType.VOIP:
                return metadata.getVoip();
            case i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER:
                return metadata.getPersonalNumber();
            case i18n.phonenumbers.PhoneNumberType.PAGER:
                return metadata.getPager();
            case i18n.phonenumbers.PhoneNumberType.UAN:
                return metadata.getUan();
            case i18n.phonenumbers.PhoneNumberType.VOICEMAIL:
                return metadata.getVoicemail();
            default:
                return metadata.getGeneralDesc();
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNumberType =
    function(number) {
        var regionCode = this.getRegionCodeForNumber(number);
        var metadata = this.getMetadataForRegionOrCallingCode_(
            number.getCountryCodeOrDefault(), regionCode);
        if (metadata == null) {
            return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return this.getNumberTypeHelper_(nationalSignificantNumber, metadata);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNumberTypeHelper_ =
    function(nationalNumber, metadata) {
        if (!this.isNumberMatchingDesc_(nationalNumber, metadata.getGeneralDesc())) {
            return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getPremiumRate())) {
            return i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getTollFree())) {
            return i18n.phonenumbers.PhoneNumberType.TOLL_FREE;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getSharedCost())) {
            return i18n.phonenumbers.PhoneNumberType.SHARED_COST;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getVoip())) {
            return i18n.phonenumbers.PhoneNumberType.VOIP;
        }
        if (this.isNumberMatchingDesc_(nationalNumber,
                metadata.getPersonalNumber())) {
            return i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getPager())) {
            return i18n.phonenumbers.PhoneNumberType.PAGER;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getUan())) {
            return i18n.phonenumbers.PhoneNumberType.UAN;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getVoicemail())) {
            return i18n.phonenumbers.PhoneNumberType.VOICEMAIL;
        }
        var isFixedLine = this.isNumberMatchingDesc_(nationalNumber, metadata
            .getFixedLine());
        if (isFixedLine) {
            if (metadata.getSameMobileAndFixedLinePattern()) {
                return i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;
            } else if (this.isNumberMatchingDesc_(nationalNumber,
                    metadata.getMobile())) {
                return i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;
            }
            return i18n.phonenumbers.PhoneNumberType.FIXED_LINE;
        }
        if (!metadata.getSameMobileAndFixedLinePattern() &&
            this.isNumberMatchingDesc_(nationalNumber, metadata.getMobile())) {
            return i18n.phonenumbers.PhoneNumberType.MOBILE;
        }
        return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getMetadataForRegion =
    function(regionCode) {
        if (regionCode == null) {
            return null;
        }
        regionCode = regionCode.toUpperCase();
        var metadata = this.regionToMetadataMap[regionCode];
        if (metadata == null) {
            var serializer = new goog.proto2.PbLiteSerializer();
            var metadataSerialized =
                i18n.phonenumbers.metadata.countryToMetadata[regionCode];
            if (metadataSerialized == null) {
                return null;
            }
            metadata =   (
                serializer.deserialize(i18n.phonenumbers.PhoneMetadata.getDescriptor(),
                    metadataSerialized));
            this.regionToMetadataMap[regionCode] = metadata;
        }
        return metadata;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getMetadataForNonGeographicalRegion = function(countryCallingCode) {
    return this.getMetadataForRegion('' + countryCallingCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberMatchingDesc_ =
    function(nationalNumber, numberDesc) {
        var actualLength = nationalNumber.length;
        if (numberDesc.possibleLengthCount() > 0 &&
            goog.array.indexOf(numberDesc.possibleLengthArray(),
                actualLength) == -1) {
            return false;
        }
        return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
            numberDesc.getNationalNumberPatternOrDefault(), nationalNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidNumber = function(number) {
    var regionCode = this.getRegionCodeForNumber(number);
    return this.isValidNumberForRegion(number, regionCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidNumberForRegion =
    function(number, regionCode) {
        var countryCode = number.getCountryCodeOrDefault();
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
        if (metadata == null ||
            (i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY !=
                regionCode &&
                countryCode != this.getCountryCodeForValidRegion_(regionCode))) {
            return false;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return this.getNumberTypeHelper_(nationalSignificantNumber, metadata) !=
            i18n.phonenumbers.PhoneNumberType.UNKNOWN;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodeForNumber =
    function(number) {
        if (number == null) {
            return null;
        }
        var countryCode = number.getCountryCodeOrDefault();
        var regions =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCode];
        if (regions == null) {
            return null;
        }
        if (regions.length == 1) {
            return regions[0];
        } else {
            return this.getRegionCodeForNumberFromRegionList_(number, regions);
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getRegionCodeForNumberFromRegionList_ = function(number, regionCodes) {
    var nationalNumber = this.getNationalSignificantNumber(number);
    var regionCode;
    var regionCodesLength = regionCodes.length;
    for (var i = 0; i < regionCodesLength; i++) {
        regionCode = regionCodes[i];
        var metadata = this.getMetadataForRegion(regionCode);
        if (metadata.hasLeadingDigits()) {
            if (nationalNumber.search(metadata.getLeadingDigits()) == 0) {
                return regionCode;
            }
        } else if (this.getNumberTypeHelper_(nationalNumber, metadata) !=
            i18n.phonenumbers.PhoneNumberType.UNKNOWN) {
            return regionCode;
        }
    }
    return null;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodeForCountryCode =
    function(countryCallingCode) {
        var regionCodes =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCallingCode];
        return regionCodes == null ?
            i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_ : regionCodes[0];
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodesForCountryCode =
    function(countryCallingCode) {
        var regionCodes =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCallingCode];
        return regionCodes == null ? [] : regionCodes;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getCountryCodeForRegion =
    function(regionCode) {
        if (!this.isValidRegionCode_(regionCode)) {
            return 0;
        }
        return this.getCountryCodeForValidRegion_(regionCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getCountryCodeForValidRegion_ =
    function(regionCode) {
        var metadata = this.getMetadataForRegion(regionCode);
        if (metadata == null) {
            throw new Error('Invalid region code: ' + regionCode);
        }
        return metadata.getCountryCodeOrDefault();
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNddPrefixForRegion = function(
    regionCode, stripNonDigits) {
    var metadata = this.getMetadataForRegion(regionCode);
    if (metadata == null) {
        return null;
    }
    var nationalPrefix = metadata.getNationalPrefixOrDefault();
    if (nationalPrefix.length == 0) {
        return null;
    }
    if (stripNonDigits) {
        nationalPrefix = nationalPrefix.replace('~', '');
    }
    return nationalPrefix;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNANPACountry =
    function(regionCode) {
        return regionCode != null && goog.array.contains(
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[
                i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_],
            regionCode.toUpperCase());
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isAlphaNumber = function(number) {
    if (!i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(number)) {
        return false;
    }
    var strippedNumber = new goog.string.StringBuffer(number);
    this.maybeStripExtension(strippedNumber);
    return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
        i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_,
        strippedNumber.toString());
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumber =
    function(number) {
        var result = this.isPossibleNumberWithReason(number);
        return result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE ||
            result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE_LOCAL_ONLY;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberForType =
    function(number, type) {
        var result = this.isPossibleNumberForTypeWithReason(number, type);
        return result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE ||
            result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE_LOCAL_ONLY;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.testNumberLength_ =
    function(number, metadata) {
        return this.testNumberLengthForType_(
            number, metadata, i18n.phonenumbers.PhoneNumberType.UNKNOWN);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.testNumberLengthForType_ =
    function(number, metadata, type) {
        var descForType =
            i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(metadata, type);
        var possibleLengths = descForType.possibleLengthCount() == 0 ?
            metadata.getGeneralDesc().possibleLengthArray() :
            descForType.possibleLengthArray();
        var localLengths = descForType.possibleLengthLocalOnlyArray();
        if (type == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE) {
            if (!i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(
                    i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                        metadata, i18n.phonenumbers.PhoneNumberType.FIXED_LINE))) {
                return this.testNumberLengthForType_(
                    number, metadata, i18n.phonenumbers.PhoneNumberType.MOBILE);
            } else {
                var mobileDesc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                    metadata, i18n.phonenumbers.PhoneNumberType.MOBILE);
                if (i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(
                        mobileDesc)) {
                    possibleLengths = possibleLengths.concat(
                        mobileDesc.possibleLengthCount() == 0 ?
                            metadata.getGeneralDesc().possibleLengthArray() :
                            mobileDesc.possibleLengthArray());
                    goog.array.sort(possibleLengths);
                    if (localLengths.length == 0) {
                        localLengths = mobileDesc.possibleLengthLocalOnlyArray();
                    } else {
                        localLengths = localLengths.concat(
                            mobileDesc.possibleLengthLocalOnlyArray());
                        goog.array.sort(localLengths);
                    }
                }
            }
        }
        if (possibleLengths[0] == -1) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_LENGTH;
        }
        var actualLength = number.length;
        if (goog.array.indexOf(localLengths, actualLength) > -1) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult
                .IS_POSSIBLE_LOCAL_ONLY;
        }
        var minimumLength = possibleLengths[0];
        if (minimumLength == actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE;
        } else if (minimumLength > actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
        } else if (possibleLengths[possibleLengths.length - 1] < actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
        }
        return (goog.array.indexOf(possibleLengths, actualLength, 1) > -1) ?
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE :
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_LENGTH;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberWithReason =
    function(number) {
        return this.isPossibleNumberForTypeWithReason(
            number, i18n.phonenumbers.PhoneNumberType.UNKNOWN);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberForTypeWithReason =
    function(number, type) {
        var nationalNumber = this.getNationalSignificantNumber(number);
        var countryCode = number.getCountryCodeOrDefault();
        if (!this.hasValidCountryCallingCode_(countryCode)) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult
                .INVALID_COUNTRY_CODE;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
        return this.testNumberLengthForType_(nationalNumber, metadata, type);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberString =
    function(number, regionDialingFrom) {
        try {
            return this.isPossibleNumber(this.parse(number, regionDialingFrom));
        } catch (e) {
            return false;
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.truncateTooLongNumber =
    function(number) {
        if (this.isValidNumber(number)) {
            return true;
        }
        var numberCopy = number.clone();
        var nationalNumber = number.getNationalNumberOrDefault();
        do {
            nationalNumber = Math.floor(nationalNumber / 10);
            numberCopy.setNationalNumber(nationalNumber);
            if (nationalNumber == 0 ||
                this.isPossibleNumberWithReason(numberCopy) ==
                i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT) {
                return false;
            }
        } while (!this.isValidNumber(numberCopy));
        number.setNationalNumber(nationalNumber);
        return true;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.extractCountryCode =
    function(fullNumber, nationalNumber) {
        var fullNumberStr = fullNumber.toString();
        if ((fullNumberStr.length == 0) || (fullNumberStr.charAt(0) == '0')) {
            return 0;
        }
        var potentialCountryCode;
        var numberLength = fullNumberStr.length;
        for (var i = 1;
             i <= i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_COUNTRY_CODE_ &&
             i <= numberLength; ++i) {
            potentialCountryCode = parseInt(fullNumberStr.substring(0, i), 10);
            if (potentialCountryCode in
                i18n.phonenumbers.metadata.countryCodeToRegionCodeMap) {
                nationalNumber.append(fullNumberStr.substring(i));
                return potentialCountryCode;
            }
        }
        return 0;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeExtractCountryCode =
    function(number, defaultRegionMetadata, nationalNumber,
             keepRawInput, phoneNumber) {
        if (number.length == 0) {
            return 0;
        }
        var fullNumber = new goog.string.StringBuffer(number);
        var possibleCountryIddPrefix;
        if (defaultRegionMetadata != null) {
            possibleCountryIddPrefix = defaultRegionMetadata.getInternationalPrefix();
        }
        if (possibleCountryIddPrefix == null) {
            possibleCountryIddPrefix = 'NonMatch';
        }
        var countryCodeSource = this.maybeStripInternationalPrefixAndNormalize(
            fullNumber, possibleCountryIddPrefix);
        if (keepRawInput) {
            phoneNumber.setCountryCodeSource(countryCodeSource);
        }
        if (countryCodeSource !=
            i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY) {
            if (fullNumber.getLength() <=
                i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
                throw new Error(i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD);
            }
            var potentialCountryCode = this.extractCountryCode(fullNumber,
                nationalNumber);
            if (potentialCountryCode != 0) {
                phoneNumber.setCountryCode(potentialCountryCode);
                return potentialCountryCode;
            }
            throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
        } else if (defaultRegionMetadata != null) {
            var defaultCountryCode = defaultRegionMetadata.getCountryCodeOrDefault();
            var defaultCountryCodeString = '' + defaultCountryCode;
            var normalizedNumber = fullNumber.toString();
            if (goog.string.startsWith(normalizedNumber, defaultCountryCodeString)) {
                var potentialNationalNumber = new goog.string.StringBuffer(
                    normalizedNumber.substring(defaultCountryCodeString.length));
                var generalDesc = defaultRegionMetadata.getGeneralDesc();
                var validNumberPattern =
                    new RegExp(generalDesc.getNationalNumberPatternOrDefault());
                this.maybeStripNationalPrefixAndCarrierCode(
                    potentialNationalNumber, defaultRegionMetadata, null);
                var potentialNationalNumberStr = potentialNationalNumber.toString();
                if ((!i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                        validNumberPattern, fullNumber.toString()) &&
                        i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                            validNumberPattern, potentialNationalNumberStr)) ||
                    this.testNumberLength_(
                        fullNumber.toString(), defaultRegionMetadata) ==
                    i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG) {
                    nationalNumber.append(potentialNationalNumberStr);
                    if (keepRawInput) {
                        phoneNumber.setCountryCodeSource(
                            i18n.phonenumbers.PhoneNumber.CountryCodeSource
                                .FROM_NUMBER_WITHOUT_PLUS_SIGN);
                    }
                    phoneNumber.setCountryCode(defaultCountryCode);
                    return defaultCountryCode;
                }
            }
        }
        phoneNumber.setCountryCode(0);
        return 0;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.parsePrefixAsIdd_ =
    function(iddPattern, number) {
        var numberStr = number.toString();
        if (numberStr.search(iddPattern) == 0) {
            var matchEnd = numberStr.match(iddPattern)[0].length;
            var matchedGroups = numberStr.substring(matchEnd).match(
                i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN);
            if (matchedGroups && matchedGroups[1] != null &&
                matchedGroups[1].length > 0) {
                var normalizedGroup =
                    i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(
                        matchedGroups[1]);
                if (normalizedGroup == '0') {
                    return false;
                }
            }
            number.clear();
            number.append(numberStr.substring(matchEnd));
            return true;
        }
        return false;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    maybeStripInternationalPrefixAndNormalize = function(number,
                                                         possibleIddPrefix) {
    var numberStr = number.toString();
    if (numberStr.length == 0) {
        return i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY;
    }
    if (i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN
            .test(numberStr)) {
        numberStr = numberStr.replace(
            i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN, '');
        number.clear();
        number.append(i18n.phonenumbers.PhoneNumberUtil.normalize(numberStr));
        return i18n.phonenumbers.PhoneNumber.CountryCodeSource
            .FROM_NUMBER_WITH_PLUS_SIGN;
    }
    var iddPattern = new RegExp(possibleIddPrefix);
    i18n.phonenumbers.PhoneNumberUtil.normalizeSB_(number);
    return this.parsePrefixAsIdd_(iddPattern, number) ?
        i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_NUMBER_WITH_IDD :
        i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.
    maybeStripNationalPrefixAndCarrierCode = function(number, metadata,
                                                      carrierCode) {
    var numberStr = number.toString();
    var numberLength = numberStr.length;
    var possibleNationalPrefix = metadata.getNationalPrefixForParsing();
    if (numberLength == 0 || possibleNationalPrefix == null ||
        possibleNationalPrefix.length == 0) {
        return false;
    }
    var prefixPattern = new RegExp('^(?:' + possibleNationalPrefix + ')');
    var prefixMatcher = prefixPattern.exec(numberStr);
    if (prefixMatcher) {
        var nationalNumberRule = new RegExp(
            metadata.getGeneralDesc().getNationalNumberPatternOrDefault());
        var isViableOriginalNumber =
            i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                nationalNumberRule, numberStr);
        var numOfGroups = prefixMatcher.length - 1;
        var transformRule = metadata.getNationalPrefixTransformRule();
        var noTransform = transformRule == null || transformRule.length == 0 ||
            prefixMatcher[numOfGroups] == null ||
            prefixMatcher[numOfGroups].length == 0;
        if (noTransform) {
            if (isViableOriginalNumber &&
                !i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                    nationalNumberRule,
                    numberStr.substring(prefixMatcher[0].length))) {
                return false;
            }
            if (carrierCode != null &&
                numOfGroups > 0 && prefixMatcher[numOfGroups] != null) {
                carrierCode.append(prefixMatcher[1]);
            }
            number.set(numberStr.substring(prefixMatcher[0].length));
            return true;
        } else {
            var transformedNumber;
            transformedNumber = numberStr.replace(prefixPattern, transformRule);
            if (isViableOriginalNumber &&
                !i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                    nationalNumberRule, transformedNumber)) {
                return false;
            }
            if (carrierCode != null && numOfGroups > 0) {
                carrierCode.append(prefixMatcher[1]);
            }
            number.set(transformedNumber);
            return true;
        }
    }
    return false;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeStripExtension =
    function(number) {
        var numberStr = number.toString();
        var mStart =
            numberStr.search(i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_);
        if (mStart >= 0 && i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(
                numberStr.substring(0, mStart))) {
            var matchedGroups =
                numberStr.match(i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_);
            var matchedGroupsLength = matchedGroups.length;
            for (var i = 1; i < matchedGroupsLength; ++i) {
                if (matchedGroups[i] != null && matchedGroups[i].length > 0) {
                    number.clear();
                    number.append(numberStr.substring(0, mStart));
                    return matchedGroups[i];
                }
            }
        }
        return '';
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.checkRegionForParsing_ = function(
    numberToParse, defaultRegion) {
    return this.isValidRegionCode_(defaultRegion) ||
        (numberToParse != null && numberToParse.length > 0 &&
            i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN.test(
                numberToParse));
};
i18n.phonenumbers.PhoneNumberUtil.prototype.parse = function(numberToParse,
                                                             defaultRegion) {
    return this.parseHelper_(numberToParse, defaultRegion, false, true);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.parseAndKeepRawInput =
    function(numberToParse, defaultRegion) {
        if (!this.isValidRegionCode_(defaultRegion)) {
            if (numberToParse.length > 0 && numberToParse.charAt(0) !=
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
            }
        }
        return this.parseHelper_(numberToParse, defaultRegion, true, true);
    };
i18n.phonenumbers.PhoneNumberUtil.setItalianLeadingZerosForPhoneNumber_ =
    function(nationalNumber, phoneNumber) {
        if (nationalNumber.length > 1 && nationalNumber.charAt(0) == '0') {
            phoneNumber.setItalianLeadingZero(true);
            var numberOfLeadingZeros = 1;
            while (numberOfLeadingZeros < nationalNumber.length - 1 &&
            nationalNumber.charAt(numberOfLeadingZeros) == '0') {
                numberOfLeadingZeros++;
            }
            if (numberOfLeadingZeros != 1) {
                phoneNumber.setNumberOfLeadingZeros(numberOfLeadingZeros);
            }
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.parseHelper_ =
    function(numberToParse, defaultRegion, keepRawInput, checkRegion) {
        if (numberToParse == null) {
            throw new Error(i18n.phonenumbers.Error.NOT_A_NUMBER);
        } else if (numberToParse.length >
            i18n.phonenumbers.PhoneNumberUtil.MAX_INPUT_STRING_LENGTH_) {
            throw new Error(i18n.phonenumbers.Error.TOO_LONG);
        }
        var nationalNumber = new goog.string.StringBuffer();
        this.buildNationalNumberForParsing_(numberToParse, nationalNumber);
        if (!i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(
                nationalNumber.toString())) {
            throw new Error(i18n.phonenumbers.Error.NOT_A_NUMBER);
        }
        if (checkRegion &&
            !this.checkRegionForParsing_(nationalNumber.toString(), defaultRegion)) {
            throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
        }
        var phoneNumber = new i18n.phonenumbers.PhoneNumber();
        if (keepRawInput) {
            phoneNumber.setRawInput(numberToParse);
        }
        var extension = this.maybeStripExtension(nationalNumber);
        if (extension.length > 0) {
            phoneNumber.setExtension(extension);
        }
        var regionMetadata = this.getMetadataForRegion(defaultRegion);
        var normalizedNationalNumber = new goog.string.StringBuffer();
        var countryCode = 0;
        var nationalNumberStr = nationalNumber.toString();
        try {
            countryCode = this.maybeExtractCountryCode(nationalNumberStr,
                regionMetadata, normalizedNationalNumber, keepRawInput, phoneNumber);
        } catch (e) {
            if (e.message == i18n.phonenumbers.Error.INVALID_COUNTRY_CODE &&
                i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN
                    .test(nationalNumberStr)) {
                nationalNumberStr = nationalNumberStr.replace(
                    i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN, '');
                countryCode = this.maybeExtractCountryCode(nationalNumberStr,
                    regionMetadata, normalizedNationalNumber, keepRawInput, phoneNumber);
                if (countryCode == 0) {
                    throw e;
                }
            } else {
                throw e;
            }
        }
        if (countryCode != 0) {
            var phoneNumberRegion = this.getRegionCodeForCountryCode(countryCode);
            if (phoneNumberRegion != defaultRegion) {
                regionMetadata = this.getMetadataForRegionOrCallingCode_(
                    countryCode, phoneNumberRegion);
            }
        } else {
            i18n.phonenumbers.PhoneNumberUtil.normalizeSB_(nationalNumber);
            normalizedNationalNumber.append(nationalNumber.toString());
            if (defaultRegion != null) {
                countryCode = regionMetadata.getCountryCodeOrDefault();
                phoneNumber.setCountryCode(countryCode);
            } else if (keepRawInput) {
                phoneNumber.clearCountryCodeSource();
            }
        }
        if (normalizedNationalNumber.getLength() <
            i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_SHORT_NSN);
        }
        if (regionMetadata != null) {
            var carrierCode = new goog.string.StringBuffer();
            var potentialNationalNumber =
                new goog.string.StringBuffer(normalizedNationalNumber.toString());
            this.maybeStripNationalPrefixAndCarrierCode(
                potentialNationalNumber, regionMetadata, carrierCode);
            var validationResult = this.testNumberLength_(
                potentialNationalNumber.toString(), regionMetadata);
            var validationResults = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
            if (validationResult != validationResults.TOO_SHORT &&
                validationResult != validationResults.IS_POSSIBLE_LOCAL_ONLY &&
                validationResult != validationResults.INVALID_LENGTH) {
                normalizedNationalNumber = potentialNationalNumber;
                if (keepRawInput && carrierCode.toString().length > 0) {
                    phoneNumber.setPreferredDomesticCarrierCode(carrierCode.toString());
                }
            }
        }
        var normalizedNationalNumberStr = normalizedNationalNumber.toString();
        var lengthOfNationalNumber = normalizedNationalNumberStr.length;
        if (lengthOfNationalNumber <
            i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_SHORT_NSN);
        }
        if (lengthOfNationalNumber >
            i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_LONG);
        }
        i18n.phonenumbers.PhoneNumberUtil.setItalianLeadingZerosForPhoneNumber_(
            normalizedNationalNumberStr, phoneNumber);
        phoneNumber.setNationalNumber(parseInt(normalizedNationalNumberStr, 10));
        return phoneNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.buildNationalNumberForParsing_ =
    function(numberToParse, nationalNumber) {
        var indexOfPhoneContext = numberToParse.indexOf(
            i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_);
        if (indexOfPhoneContext >= 0) {
            var phoneContextStart = indexOfPhoneContext +
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_.length;
            if (numberToParse.charAt(phoneContextStart) ==
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                var phoneContextEnd = numberToParse.indexOf(';', phoneContextStart);
                if (phoneContextEnd > 0) {
                    nationalNumber.append(numberToParse.substring(phoneContextStart,
                        phoneContextEnd));
                } else {
                    nationalNumber.append(numberToParse.substring(phoneContextStart));
                }
            }
            var indexOfRfc3966Prefix = numberToParse.indexOf(
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_);
            var indexOfNationalNumber = (indexOfRfc3966Prefix >= 0) ?
                indexOfRfc3966Prefix +
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_.length : 0;
            nationalNumber.append(numberToParse.substring(indexOfNationalNumber,
                indexOfPhoneContext));
        } else {
            nationalNumber.append(
                i18n.phonenumbers.PhoneNumberUtil.extractPossibleNumber(numberToParse));
        }
        var nationalNumberStr = nationalNumber.toString();
        var indexOfIsdn = nationalNumberStr.indexOf(
            i18n.phonenumbers.PhoneNumberUtil.RFC3966_ISDN_SUBADDRESS_);
        if (indexOfIsdn > 0) {
            nationalNumber.clear();
            nationalNumber.append(nationalNumberStr.substring(0, indexOfIsdn));
        }
    };
i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_ = function(numberIn) {
    var phoneNumber = new i18n.phonenumbers.PhoneNumber();
    phoneNumber.setCountryCode(numberIn.getCountryCodeOrDefault());
    phoneNumber.setNationalNumber(numberIn.getNationalNumberOrDefault());
    if (numberIn.getExtensionOrDefault().length > 0) {
        phoneNumber.setExtension(numberIn.getExtensionOrDefault());
    }
    if (numberIn.getItalianLeadingZero()) {
        phoneNumber.setItalianLeadingZero(true);
        phoneNumber.setNumberOfLeadingZeros(
            numberIn.getNumberOfLeadingZerosOrDefault());
    }
    return phoneNumber;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberMatch =
    function(firstNumberIn, secondNumberIn) {
        var firstNumber;
        var secondNumber;
        if (typeof firstNumberIn == 'string') {
            try {
                firstNumber = this.parse(
                    firstNumberIn, i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_);
            } catch (e) {
                if (e.message != i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
                if (typeof secondNumberIn != 'string') {
                    var secondNumberRegion = this.getRegionCodeForCountryCode(
                        secondNumberIn.getCountryCodeOrDefault());
                    if (secondNumberRegion !=
                        i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_) {
                        try {
                            firstNumber = this.parse(firstNumberIn, secondNumberRegion);
                        } catch (e2) {
                            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                        }
                        var match = this.isNumberMatch(firstNumber, secondNumberIn);
                        if (match ==
                            i18n.phonenumbers.PhoneNumberUtil.MatchType.EXACT_MATCH) {
                            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NSN_MATCH;
                        }
                        return match;
                    }
                }
                try {
                    firstNumber = this.parseHelper_(firstNumberIn, null, false, false);
                } catch (e2) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
            }
        } else {
            firstNumber = firstNumberIn.clone();
        }
        if (typeof secondNumberIn == 'string') {
            try {
                secondNumber = this.parse(
                    secondNumberIn, i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_);
                return this.isNumberMatch(firstNumberIn, secondNumber);
            } catch (e) {
                if (e.message != i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
                return this.isNumberMatch(secondNumberIn, firstNumber);
            }
        } else {
            secondNumber = secondNumberIn.clone();
        }
        var firstNumberToCompare =
            i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_(firstNumber);
        var secondNumberToCompare =
            i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_(secondNumber);
        if (firstNumberToCompare.hasExtension() &&
            secondNumberToCompare.hasExtension() &&
            firstNumberToCompare.getExtension() !=
            secondNumberToCompare.getExtension()) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
        }
        var firstNumberCountryCode = firstNumberToCompare.getCountryCodeOrDefault();
        var secondNumberCountryCode = secondNumberToCompare.getCountryCodeOrDefault();
        if (firstNumberCountryCode != 0 && secondNumberCountryCode != 0) {
            if (firstNumberToCompare.equals(secondNumberToCompare)) {
                return i18n.phonenumbers.PhoneNumberUtil.MatchType.EXACT_MATCH;
            } else if (firstNumberCountryCode == secondNumberCountryCode &&
                this.isNationalNumberSuffixOfTheOther_(
                    firstNumberToCompare, secondNumberToCompare)) {
                return i18n.phonenumbers.PhoneNumberUtil.MatchType.SHORT_NSN_MATCH;
            }
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
        }
        firstNumberToCompare.setCountryCode(0);
        secondNumberToCompare.setCountryCode(0);
        if (firstNumberToCompare.equals(secondNumberToCompare)) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NSN_MATCH;
        }
        if (this.isNationalNumberSuffixOfTheOther_(firstNumberToCompare,
                secondNumberToCompare)) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.SHORT_NSN_MATCH;
        }
        return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isNationalNumberSuffixOfTheOther_ =
    function(firstNumber, secondNumber) {
        var firstNumberNationalNumber = '' + firstNumber.getNationalNumber();
        var secondNumberNationalNumber = '' + secondNumber.getNationalNumber();
        return goog.string.endsWith(firstNumberNationalNumber,
            secondNumberNationalNumber) ||
            goog.string.endsWith(secondNumberNationalNumber,
                firstNumberNationalNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.canBeInternationallyDialled =
    function(number) {
        var metadata = this.getMetadataForRegion(this.getRegionCodeForNumber(number));
        if (metadata == null) {
            return true;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return !this.isNumberMatchingDesc_(nationalSignificantNumber,
            metadata.getNoInternationalDialling());
    };
i18n.phonenumbers.PhoneNumberUtil.matchesEntirely = function(regex, str) {
    var matchedGroups = (typeof regex == 'string') ?
        str.match('^(?:' + regex + ')$') : str.match(regex);
    if (matchedGroups && matchedGroups[0].length == str.length) {
        return true;
    }
    return false;
};
i18n.phonenumbers.PhoneNumberUtil.matchesPrefix = function(regex, str) {
    var matchedGroups = (typeof regex == 'string') ?
        str.match('^(?:' + regex + ')') : str.match(regex);
    if (matchedGroups && goog.string.startsWith(str, matchedGroups[0])) {
        return true;
    }
    return false;
};

/*phonenumberutil.js*/


/*asyoutypeformatter.js*/

i18n.phonenumbers.AsYouTypeFormatter = function(regionCode) {
    this.DIGIT_PLACEHOLDER_ = '\u2008';
    this.DIGIT_PATTERN_ = new RegExp(this.DIGIT_PLACEHOLDER_);
    this.currentOutput_ = '';
    this.formattingTemplate_ = new goog.string.StringBuffer();
    this.currentFormattingPattern_ = '';
    this.accruedInput_ = new goog.string.StringBuffer();
    this.accruedInputWithoutFormatting_ = new goog.string.StringBuffer();
    this.ableToFormat_ = true;
    this.inputHasFormatting_ = false;
    this.isCompleteNumber_ = false;
    this.isExpectingCountryCallingCode_ = false;
    this.phoneUtil_ = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    this.lastMatchPosition_ = 0;
    this.originalPosition_ = 0;
    this.positionToRemember_ = 0;
    this.prefixBeforeNationalNumber_ = new goog.string.StringBuffer();
    this.shouldAddSpaceAfterNationalPrefix_ = false;
    this.extractedNationalPrefix_ = '';
    this.nationalNumber_ = new goog.string.StringBuffer();
    this.possibleFormats_ = [];
    this.defaultCountry_ = regionCode;
    this.currentMetadata_ = this.getMetadataForRegion_(this.defaultCountry_);
    this.defaultMetadata_ = this.currentMetadata_;
};
i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_ = ' ';
i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_ =
    new i18n.phonenumbers.PhoneMetadata();
i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_
    .setInternationalPrefix('NA');
i18n.phonenumbers.AsYouTypeFormatter.CHARACTER_CLASS_PATTERN_ =
    /\[([^\[\]])*\]/g;
i18n.phonenumbers.AsYouTypeFormatter.STANDALONE_DIGIT_PATTERN_ =
    /\d(?=[^,}][^,}])/g;
i18n.phonenumbers.AsYouTypeFormatter.ELIGIBLE_FORMAT_PATTERN_ = new RegExp(
    '^[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']*' +
    '(\\$\\d[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']*)+$');
i18n.phonenumbers.AsYouTypeFormatter.NATIONAL_PREFIX_SEPARATORS_PATTERN_ =
    /[- ]/;
i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_ = 3;
i18n.phonenumbers.AsYouTypeFormatter.prototype.getMetadataForRegion_ =
    function(regionCode) {
        var countryCallingCode = this.phoneUtil_.getCountryCodeForRegion(regionCode);
        var mainCountry =
            this.phoneUtil_.getRegionCodeForCountryCode(countryCallingCode);
        var metadata = this.phoneUtil_.getMetadataForRegion(mainCountry);
        if (metadata != null) {
            return metadata;
        }
        return i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.maybeCreateNewTemplate_ =
    function() {
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var numberFormat = this.possibleFormats_[i];
            var pattern = numberFormat.getPatternOrDefault();
            if (this.currentFormattingPattern_ == pattern) {
                return false;
            }
            if (this.createFormattingTemplate_(numberFormat)) {
                this.currentFormattingPattern_ = pattern;
                this.shouldAddSpaceAfterNationalPrefix_ =
                    i18n.phonenumbers.AsYouTypeFormatter.
                    NATIONAL_PREFIX_SEPARATORS_PATTERN_.test(
                        numberFormat.getNationalPrefixFormattingRule());
                this.lastMatchPosition_ = 0;
                return true;
            }
        }
        this.ableToFormat_ = false;
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getAvailableFormats_ =
    function(leadingDigits) {
        var formatList =
            (this.isCompleteNumber_ &&
                this.currentMetadata_.intlNumberFormatCount() > 0) ?
                this.currentMetadata_.intlNumberFormatArray() :
                this.currentMetadata_.numberFormatArray();
        var formatListLength = formatList.length;
        for (var i = 0; i < formatListLength; ++i) {
            var format = formatList[i];
            var nationalPrefixIsUsedByCountry =
                this.currentMetadata_.hasNationalPrefix();
            if (!nationalPrefixIsUsedByCountry || this.isCompleteNumber_ ||
                format.getNationalPrefixOptionalWhenFormatting() ||
                this.phoneUtil_.formattingRuleHasFirstGroupOnly(
                    format.getNationalPrefixFormattingRuleOrDefault())) {
                if (this.isFormatEligible_(format.getFormatOrDefault())) {
                    this.possibleFormats_.push(format);
                }
            }
        }
        this.narrowDownPossibleFormats_(leadingDigits);
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.isFormatEligible_ =
    function(format) {
        return i18n.phonenumbers.AsYouTypeFormatter.ELIGIBLE_FORMAT_PATTERN_
            .test(format);
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.narrowDownPossibleFormats_ =
    function(leadingDigits) {
        var possibleFormats = [];
        var indexOfLeadingDigitsPattern =
            leadingDigits.length -
            i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_;
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var format = this.possibleFormats_[i];
            if (format.leadingDigitsPatternCount() == 0) {
                possibleFormats.push(this.possibleFormats_[i]);
                continue;
            }
            var lastLeadingDigitsPattern = Math.min(
                indexOfLeadingDigitsPattern, format.leadingDigitsPatternCount() - 1);
            var leadingDigitsPattern =          (format.getLeadingDigitsPattern(lastLeadingDigitsPattern));
            if (leadingDigits.search(leadingDigitsPattern) == 0) {
                possibleFormats.push(this.possibleFormats_[i]);
            }
        }
        this.possibleFormats_ = possibleFormats;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.createFormattingTemplate_ =
    function(format) {
        var numberPattern = format.getPatternOrDefault();
        if (numberPattern.indexOf('|') != -1) {
            return false;
        }
        numberPattern = numberPattern.replace(
            i18n.phonenumbers.AsYouTypeFormatter.CHARACTER_CLASS_PATTERN_, '\\d');
        numberPattern = numberPattern.replace(
            i18n.phonenumbers.AsYouTypeFormatter.STANDALONE_DIGIT_PATTERN_, '\\d');
        this.formattingTemplate_.clear();
        var tempTemplate = this.getFormattingTemplate_(numberPattern,
            format.getFormatOrDefault());
        if (tempTemplate.length > 0) {
            this.formattingTemplate_.append(tempTemplate);
            return true;
        }
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getFormattingTemplate_ =
    function(numberPattern, numberFormat) {
        var longestPhoneNumber = '999999999999999';
        var m = longestPhoneNumber.match(numberPattern);
        var aPhoneNumber = m[0];
        if (aPhoneNumber.length < this.nationalNumber_.getLength()) {
            return '';
        }
        var template = aPhoneNumber.replace(new RegExp(numberPattern, 'g'),
            numberFormat);
        template = template.replace(new RegExp('9', 'g'), this.DIGIT_PLACEHOLDER_);
        return template;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.clear = function() {
    this.currentOutput_ = '';
    this.accruedInput_.clear();
    this.accruedInputWithoutFormatting_.clear();
    this.formattingTemplate_.clear();
    this.lastMatchPosition_ = 0;
    this.currentFormattingPattern_ = '';
    this.prefixBeforeNationalNumber_.clear();
    this.extractedNationalPrefix_ = '';
    this.nationalNumber_.clear();
    this.ableToFormat_ = true;
    this.inputHasFormatting_ = false;
    this.positionToRemember_ = 0;
    this.originalPosition_ = 0;
    this.isCompleteNumber_ = false;
    this.isExpectingCountryCallingCode_ = false;
    this.possibleFormats_ = [];
    this.shouldAddSpaceAfterNationalPrefix_ = false;
    if (this.currentMetadata_ != this.defaultMetadata_) {
        this.currentMetadata_ = this.getMetadataForRegion_(this.defaultCountry_);
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigit = function(nextChar) {
    this.currentOutput_ =
        this.inputDigitWithOptionToRememberPosition_(nextChar, false);
    return this.currentOutput_;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigitAndRememberPosition =
    function(nextChar) {
        this.currentOutput_ =
            this.inputDigitWithOptionToRememberPosition_(nextChar, true);
        return this.currentOutput_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    inputDigitWithOptionToRememberPosition_ = function(nextChar,
                                                       rememberPosition) {
    this.accruedInput_.append(nextChar);
    if (rememberPosition) {
        this.originalPosition_ = this.accruedInput_.getLength();
    }
    if (!this.isDigitOrLeadingPlusSign_(nextChar)) {
        this.ableToFormat_ = false;
        this.inputHasFormatting_ = true;
    } else {
        nextChar = this.normalizeAndAccrueDigitsAndPlusSign_(nextChar,
            rememberPosition);
    }
    if (!this.ableToFormat_) {
        if (this.inputHasFormatting_) {
            return this.accruedInput_.toString();
        } else if (this.attemptToExtractIdd_()) {
            if (this.attemptToExtractCountryCallingCode_()) {
                return this.attemptToChoosePatternWithPrefixExtracted_();
            }
        } else if (this.ableToExtractLongerNdd_()) {
            this.prefixBeforeNationalNumber_.append(
                i18n.phonenumbers.AsYouTypeFormatter.
                    SEPARATOR_BEFORE_NATIONAL_NUMBER_);
            return this.attemptToChoosePatternWithPrefixExtracted_();
        }
        return this.accruedInput_.toString();
    }
    switch (this.accruedInputWithoutFormatting_.getLength()) {
        case 0:
        case 1:
        case 2:
            return this.accruedInput_.toString();
        case 3:
            if (this.attemptToExtractIdd_()) {
                this.isExpectingCountryCallingCode_ = true;
            } else {
                this.extractedNationalPrefix_ =
                    this.removeNationalPrefixFromNationalNumber_();
                return this.attemptToChooseFormattingPattern_();
            }
        default:
            if (this.isExpectingCountryCallingCode_) {
                if (this.attemptToExtractCountryCallingCode_()) {
                    this.isExpectingCountryCallingCode_ = false;
                }
                return this.prefixBeforeNationalNumber_.toString() +
                    this.nationalNumber_.toString();
            }
            if (this.possibleFormats_.length > 0) {
                var tempNationalNumber = this.inputDigitHelper_(nextChar);
                var formattedNumber = this.attemptToFormatAccruedDigits_();
                if (formattedNumber.length > 0) {
                    return formattedNumber;
                }
                this.narrowDownPossibleFormats_(this.nationalNumber_.toString());
                if (this.maybeCreateNewTemplate_()) {
                    return this.inputAccruedNationalNumber_();
                }
                return this.ableToFormat_ ?
                    this.appendNationalNumber_(tempNationalNumber) :
                    this.accruedInput_.toString();
            } else {
                return this.attemptToChooseFormattingPattern_();
            }
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToChoosePatternWithPrefixExtracted_ = function() {
    this.ableToFormat_ = true;
    this.isExpectingCountryCallingCode_ = false;
    this.possibleFormats_ = [];
    this.lastMatchPosition_ = 0;
    this.formattingTemplate_.clear();
    this.currentFormattingPattern_ = '';
    return this.attemptToChooseFormattingPattern_();
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.getExtractedNationalPrefix_ =
    function() {
        return this.extractedNationalPrefix_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.ableToExtractLongerNdd_ =
    function() {
        if (this.extractedNationalPrefix_.length > 0) {
            var nationalNumberStr = this.nationalNumber_.toString();
            this.nationalNumber_.clear();
            this.nationalNumber_.append(this.extractedNationalPrefix_);
            this.nationalNumber_.append(nationalNumberStr);
            var prefixBeforeNationalNumberStr =
                this.prefixBeforeNationalNumber_.toString();
            var indexOfPreviousNdd = prefixBeforeNationalNumberStr.lastIndexOf(
                this.extractedNationalPrefix_);
            this.prefixBeforeNationalNumber_.clear();
            this.prefixBeforeNationalNumber_.append(
                prefixBeforeNationalNumberStr.substring(0, indexOfPreviousNdd));
        }
        return this.extractedNationalPrefix_ !=
            this.removeNationalPrefixFromNationalNumber_();
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.isDigitOrLeadingPlusSign_ =
    function(nextChar) {
        return i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN
                .test(nextChar) ||
            (this.accruedInput_.getLength() == 1 &&
                i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_PATTERN.test(nextChar));
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.attemptToFormatAccruedDigits_ =
    function() {
        var nationalNumber = this.nationalNumber_.toString();
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var numberFormat = this.possibleFormats_[i];
            var pattern = numberFormat.getPatternOrDefault();
            var patternRegExp = new RegExp('^(?:' + pattern + ')$');
            if (patternRegExp.test(nationalNumber)) {
                this.shouldAddSpaceAfterNationalPrefix_ =
                    i18n.phonenumbers.AsYouTypeFormatter.
                    NATIONAL_PREFIX_SEPARATORS_PATTERN_.test(
                        numberFormat.getNationalPrefixFormattingRule());
                var formattedNumber = nationalNumber.replace(new RegExp(pattern, 'g'),
                    numberFormat.getFormat());
                return this.appendNationalNumber_(formattedNumber);
            }
        }
        return '';
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.appendNationalNumber_ =
    function(nationalNumber) {
        var prefixBeforeNationalNumberLength =
            this.prefixBeforeNationalNumber_.getLength();
        if (this.shouldAddSpaceAfterNationalPrefix_ &&
            prefixBeforeNationalNumberLength > 0 &&
            this.prefixBeforeNationalNumber_.toString().charAt(
                prefixBeforeNationalNumberLength - 1) !=
            i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_) {
            return this.prefixBeforeNationalNumber_ +
                i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_ +
                nationalNumber;
        } else {
            return this.prefixBeforeNationalNumber_ + nationalNumber;
        }
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getRememberedPosition =
    function() {
        if (!this.ableToFormat_) {
            return this.originalPosition_;
        }
        var accruedInputIndex = 0;
        var currentOutputIndex = 0;
        var accruedInputWithoutFormatting =
            this.accruedInputWithoutFormatting_.toString();
        var currentOutput = this.currentOutput_.toString();
        while (accruedInputIndex < this.positionToRemember_ &&
        currentOutputIndex < currentOutput.length) {
            if (accruedInputWithoutFormatting.charAt(accruedInputIndex) ==
                currentOutput.charAt(currentOutputIndex)) {
                accruedInputIndex++;
            }
            currentOutputIndex++;
        }
        return currentOutputIndex;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToChooseFormattingPattern_ = function() {
    var nationalNumber = this.nationalNumber_.toString();
    if (nationalNumber.length >=
        i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_) {
        this.getAvailableFormats_(nationalNumber);
        var formattedNumber = this.attemptToFormatAccruedDigits_();
        if (formattedNumber.length > 0) {
            return formattedNumber;
        }
        return this.maybeCreateNewTemplate_() ?
            this.inputAccruedNationalNumber_() : this.accruedInput_.toString();
    } else {
        return this.appendNationalNumber_(nationalNumber);
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputAccruedNationalNumber_ =
    function() {
        var nationalNumber = this.nationalNumber_.toString();
        var lengthOfNationalNumber = nationalNumber.length;
        if (lengthOfNationalNumber > 0) {
            var tempNationalNumber = '';
            for (var i = 0; i < lengthOfNationalNumber; i++) {
                tempNationalNumber =
                    this.inputDigitHelper_(nationalNumber.charAt(i));
            }
            return this.ableToFormat_ ?
                this.appendNationalNumber_(tempNationalNumber) :
                this.accruedInput_.toString();
        } else {
            return this.prefixBeforeNationalNumber_.toString();
        }
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    isNanpaNumberWithNationalPrefix_ = function() {
    if (this.currentMetadata_.getCountryCode() != 1) {
        return false;
    }
    var nationalNumber = this.nationalNumber_.toString();
    return (nationalNumber.charAt(0) == '1') &&
        (nationalNumber.charAt(1) != '0') &&
        (nationalNumber.charAt(1) != '1');
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    removeNationalPrefixFromNationalNumber_ = function() {
    var nationalNumber = this.nationalNumber_.toString();
    var startOfNationalNumber = 0;
    if (this.isNanpaNumberWithNationalPrefix_()) {
        startOfNationalNumber = 1;
        this.prefixBeforeNationalNumber_.append('1').append(
            i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_);
        this.isCompleteNumber_ = true;
    } else if (this.currentMetadata_.hasNationalPrefixForParsing()) {
        var nationalPrefixForParsing = new RegExp(
            '^(?:' + this.currentMetadata_.getNationalPrefixForParsing() + ')');
        var m = nationalNumber.match(nationalPrefixForParsing);
        if (m != null && m[0] != null && m[0].length > 0) {
            this.isCompleteNumber_ = true;
            startOfNationalNumber = m[0].length;
            this.prefixBeforeNationalNumber_.append(nationalNumber.substring(0,
                startOfNationalNumber));
        }
    }
    this.nationalNumber_.clear();
    this.nationalNumber_.append(nationalNumber.substring(startOfNationalNumber));
    return nationalNumber.substring(0, startOfNationalNumber);
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.attemptToExtractIdd_ =
    function() {
        var accruedInputWithoutFormatting =
            this.accruedInputWithoutFormatting_.toString();
        var internationalPrefix = new RegExp(
            '^(?:' + '\\' + i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + '|' +
            this.currentMetadata_.getInternationalPrefix() + ')');
        var m = accruedInputWithoutFormatting.match(internationalPrefix);
        if (m != null && m[0] != null && m[0].length > 0) {
            this.isCompleteNumber_ = true;
            var startOfCountryCallingCode = m[0].length;
            this.nationalNumber_.clear();
            this.nationalNumber_.append(
                accruedInputWithoutFormatting.substring(startOfCountryCallingCode));
            this.prefixBeforeNationalNumber_.clear();
            this.prefixBeforeNationalNumber_.append(
                accruedInputWithoutFormatting.substring(0, startOfCountryCallingCode));
            if (accruedInputWithoutFormatting.charAt(0) !=
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                this.prefixBeforeNationalNumber_.append(
                    i18n.phonenumbers.AsYouTypeFormatter.
                        SEPARATOR_BEFORE_NATIONAL_NUMBER_);
            }
            return true;
        }
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToExtractCountryCallingCode_ = function() {
    if (this.nationalNumber_.getLength() == 0) {
        return false;
    }
    var numberWithoutCountryCallingCode = new goog.string.StringBuffer();
    var countryCode = this.phoneUtil_.extractCountryCode(
        this.nationalNumber_, numberWithoutCountryCallingCode);
    if (countryCode == 0) {
        return false;
    }
    this.nationalNumber_.clear();
    this.nationalNumber_.append(numberWithoutCountryCallingCode.toString());
    var newRegionCode = this.phoneUtil_.getRegionCodeForCountryCode(countryCode);
    if (i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ==
        newRegionCode) {
        this.currentMetadata_ =
            this.phoneUtil_.getMetadataForNonGeographicalRegion(countryCode);
    } else if (newRegionCode != this.defaultCountry_) {
        this.currentMetadata_ = this.getMetadataForRegion_(newRegionCode);
    }
    var countryCodeString = '' + countryCode;
    this.prefixBeforeNationalNumber_.append(countryCodeString).append(
        i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_);
    this.extractedNationalPrefix_ = '';
    return true;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    normalizeAndAccrueDigitsAndPlusSign_ = function(nextChar,
                                                    rememberPosition) {
    var normalizedChar;
    if (nextChar == i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
        normalizedChar = nextChar;
        this.accruedInputWithoutFormatting_.append(nextChar);
    } else {
        normalizedChar = i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS[nextChar];
        this.accruedInputWithoutFormatting_.append(normalizedChar);
        this.nationalNumber_.append(normalizedChar);
    }
    if (rememberPosition) {
        this.positionToRemember_ = this.accruedInputWithoutFormatting_.getLength();
    }
    return normalizedChar;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigitHelper_ =
    function(nextChar) {
        var formattingTemplate = this.formattingTemplate_.toString();
        if (formattingTemplate.substring(this.lastMatchPosition_)
                .search(this.DIGIT_PATTERN_) >= 0) {
            var digitPatternStart = formattingTemplate.search(this.DIGIT_PATTERN_);
            var tempTemplate =
                formattingTemplate.replace(this.DIGIT_PATTERN_, nextChar);
            this.formattingTemplate_.clear();
            this.formattingTemplate_.append(tempTemplate);
            this.lastMatchPosition_ = digitPatternStart;
            return tempTemplate.substring(0, this.lastMatchPosition_ + 1);
        } else {
            if (this.possibleFormats_.length == 1) {
                this.ableToFormat_ = false;
            }       this.currentFormattingPattern_ = '';
            return this.accruedInput_.toString();
        }
    };
/*asyoutypeformatter.js*/ 
 $(window).load(function() {
    !function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","gio.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/assets.growingio.com/2.1/gio.js*/,"gio");
    gio('init', '59a81cc7d8c04307ba183d331c373ef6', {});
    gio('config', {'hashtag':true}); 
    if($('#loginUserId').val()){
        gio('setUserId',  $('#loginUserId').val());
    }
    else{
        gio('setUserId',  "N/A");
    }
    gio('send');
    if(!$('#loginUserId').val()){
        gio('clearUserId');
    }
    var pageOp = $('#actionName').val().toLocaleLowerCase();
    
    switch(pageOp)
    {
        //gio 订单详情页
        case 'fangke_orderdetail':
            var state = $(".t_tit span").text();
            var reg = /[\u4e00-\u9fa5]|）|：|（/g;
            var bookorderid = $(".t_box .t_info.clearfix h6").text().replace(reg, "");
            var pushToGio = {};
            pushToGio.state = state;
            pushToGio.bookorderid = bookorderid;
            updatePS('订单详情页_WEB',pushToGio);
            break;
        //gio 预订页_H5
        case 'front_addbookorder':
            var url = window.location.href;
            var arrUrl = url.split("?");
            var arrPara = arrUrl[1].split("&");
            var arr = arrPara[0].split("=");
            var pushToGio = {};
            pushToGio.luid = arr[1];
            updatePS('预订页_WEB',pushToGio);
            break;
        //gio 房间详情页
        case 'front_detail':
            var userfrom = 'other';
            var fromUrl = document.referrer.split(/\/\//)[1];
            if(fromUrl == undefined){
                userfrom = "other";
            }
            else if(fromUrl.indexOf("fangzi")){
                var begin = fromUrl.indexOf("fangzi")+7;
                var end = fromUrl.indexOf("html");
                var luid1 = fromUrl.slice(begin,end);
                var url = window.location.href; 
                var begin = url.indexOf("fangzi")+7;
                var end = url.indexOf("html");
                var luid2 = url.slice(begin,end);
                if(luid1 == luid2){
                    userfrom = "im";
                }
                else{
                    userfrom = "detail";
                }
            }
            else if(fromUrl.indexOf("fangdong")){
                userfrom = "landlord";
            }
            else if(fromUrl.indexOf("xiaozhu")){
                var url = fromUrl.split("/")[0];
                var arr = url.split(".");
                if(arr[0].indexof("www")||arr[0].indexof("dev")||arr[0].indexof("test")){
                    userfrom = "home";
                }
                else if(arr.length == 3 ||arr.length == 4){
                    userfrom = "result";
                }
            }
            var luid = $("#lodgeUnitId").val();
            var leasetype = $("#introduce .border_none .h_ico1").text(); 
            var commentscore = $("#comment_box .comment_box .x_textscore").text().split("/")[0];
            var reg = /[\u4e00-\u9fa5]/g;
            var guestnum = $("#introduce").children("li:eq(1)").children(".h_ico2").text().replace(reg, "");
            var city = $('#cityName').val();
            var price = $('#pricePart div span').text();
            var youpin = "否";
            var xianzhuhoufu = "否";
            var carefree = "否";
            var labels = $(".labels").children().each(function(k,v){
                var lable = $(this).children();
                if(lable.hasClass("youpin_ico")){
                    youpin = "是";
                }
                if(lable.hasClass("xianzhuhoufu_ico")){
                    xianzhuhoufu = "是";
                }
                if(lable.hasClass("carefree_ico")){
                    carefreeinsurance = "是";
                }
            });
            var pushToGio = {};
            pushToGio.luid = luid;
            pushToGio.firststaythenpay = xianzhuhoufu;
            pushToGio.leasetype = leasetype;
            pushToGio.userfrom = userfrom;
            pushToGio.commentscore = commentscore;
            pushToGio.guestnum = guestnum;
            pushToGio.youpin = youpin;
            pushToGio.cityname = city;
            pushToGio.price = price;
            pushToGio.carefreeinsurance = carefree;
            updatePS('房间详情页_WEB',pushToGio);
            break;
        //gio 城市结果页
        case 'front_search':
            var pushToGio = {};
            var guestnum = 0;
            var price = '-';
            $('.tj_con').children().each(function(k,v){
                var id = $(this).attr("id");
                var text = $(this).text();
                var reg = /[\u4e00-\u9fa5]/g;
                if (id == 'delguestnum') {
                    guestnum = text.replace(reg, "");
                }
                if (id == 'delprice') {
                    prices = text.split("-");
                    if(prices.length > 1){
                        price = text.replace(reg, "");
                    }
                    else if(text.indexof("以上")){
                        price = text.replace(reg, "")+'-';
                    }
                    else if(text.indexof("以下")){
                        price = '-'+text.replace(reg, "");
                    }
                }
            });
            var keyword = '';
            var landmark = '';
            if($('#searchKeyLandMark').length>0){
                landmark = $("#keyword").val();
            }
            if($('#deldistrict').length>0){
                landmark = $('#deldistrict').text();
            }
            if(landmark.length == 0){
                keyword = $("#keyword").val();
            }
            var rentType = [];
            $('#rentType').children(".type_list").children().each(function(k,v){
                if ($(this).hasClass('select_active')) rentType.push($(this).children().text().trim());
            });
            var facilities = [];
            $('#facilities').children().each(function(k,v){
                if ($(this).hasClass('col_blue')) facilities.push($(this).text().trim());
            });
            var huXing = [];
            $('#housetyperoomcnt').children().each(function(k,v){
                if ($(this).hasClass('col_blue')) huXing.push($(this).text().trim());
            });
            
            pushToGio.cityname = $("#searchcityd").val();
            pushToGio.landmark = landmark;
            pushToGio.checkday = $("#startenddate").val();
            pushToGio.leasetype = rentType.join('|');
            pushToGio.facility = facilities.join('|');
            pushToGio.housetyperoom = huXing.join('|');
            pushToGio.guestnum = guestnum;
            pushToGio.keyword = keyword;
            pushToGio.price = price;
            updatePS('城市列表_WEB',pushToGio);
            break;
    }

    function updatePS(pageGroup, pushObj){
        gio('http://jci.xiaozhustatic1.com/e19061101/page.set','pageGroup', pageGroup);
        for (var k in pushObj ) {
            gio('http://jci.xiaozhustatic1.com/e19061101/page.set',k,pushObj[k]);
        }
        try {
            gio('sendPage');
        } catch (e) {} finally {}
    }

    /*pinyou ad start*/
    (function(w,d,s,l,a){
        w._CommandName_=l;w[l]=w[l]||function(){(w[l].q=w[l].q||[]).push(arguments);
        w[l].track = function(){(w[l].q[w[l].q.length-1].t=[]).push(arguments)};return w[l]},w[l].a=a,w[l].l=1*new Date();
        var c = d.createElement(s);c.async=1;
        c.src='a.js'/*tpa=http://fm.ipinyou.com/j/a.js*/;
        var h = d.getElementsByTagName(s)[0];h.parentNode.insertBefore(c, h);
    })(window,document,'script','py','xQ..hro7LpUkqvqdkotNNc_6Y0');

    var denyPageOp = ['Front_Detail','Front_AddBookorder','Front_BookSuccess',
        'Front_BookOrderPay','Front_OrderPaySuccess','Front_OrderFirstPayPaySuccess','Front_BookOrderPayFirstPay'];
    var pageOp = $('#actionName').val();
    if($.inArray(pageOp,denyPageOp) == -1){
        py('event','viewPage');
    }
    //ludetail send to pinyou
    if(pageOp == 'Front_Detail'){
        var py_luId = $("#lodgeUnitId").val();
        var py_luName = $('.pho_info h4 em').text();
        var py_luAddr = $('.pho_info p').attr('title');
        var py_luUrl = window.location.href;
        var py_luCity = $('#cityName').val();
        var py_luPrice = $('#pricePart div span').text();
        var luIsAbord = $('#isAbroad').val() == 0 ? '国内' : '海外';
        var py_catGry = luIsAbord + '>' 
        var py_promotion = $.trim($('.price_top div').text());
        var py_curLuImgSrc = $('#curBigImage').attr('src');
        var py_curLuImgW = $('#curBigImage').attr('width');
        var py_curLuImgH = $('#curBigImage').attr('height');
        py('event','viewItem',
        { 
            'product_no':py_luId,
            'name':py_luName,
            'category':py_luCity + '>' + py_luAddr,
            'price':py_luPrice,
            'orig_price':py_luPrice,
            'currency_code':'',
            'product_url':py_luUrl,
            'pc_pic_url':py_curLuImgSrc,
            'pic_size':py_curLuImgW + '*' + py_curLuImgH,
            'promotion':py_promotion,
            'sold_out':0,
            'brand':py_luCity
        });
    }
    function checkBDSource(source) {
        var channels = localStorage.getItem('referrerStatistics');
        if (!channels || !channels.length) {
            return false;
        }
        channels = JSON.parse(channels);
        var len = channels.length;
        var flag = false;
        for (var i = 0; i < len; i++) {
            if(channels[i].utm_source && channels[i].utm_source.indexOf(source) != -1){
                flag = true;
                break;
            }
        }
        return flag;
    }

    var sendPermission = checkBDSource('pinyou');
    if(sendPermission){
        //booksuccess
        if($('#actionName').val() == 'Front_BookSuccess' || $('#actionName').val() == 'Front_BookOrderPayFirstPay'){
            var py_orderId = $('#bookOrderId').val();
            var py_orderPrice = $('#totalPrice').val();
            var py_orderLuId = $('#luid').val();
            var py_dayCount = $('#dayCount').val();
            py('event','order' ,{'id':py_orderId,'money':py_orderPrice,
                'items':[{'id':py_orderLuId,'count':py_dayCount,'price':py_orderPrice}]
            }).track('xQ.Guh.1PubYVWhAJF0WTQbN37l9_');
            
        }
        //waittocheckin
        if($('#actionName').val() == 'Front_OrderPaySuccess' || $('#actionName').val() == 'Front_OrderFirstPayPaySuccess'){
            var py_orderId = $('#bookOrderId').val();
            var py_orderPrice = $('#totalPrice').val();
            var py_orderLuId = $('#luid').val();
            var py_dayCount = $('#dayCount').val();
            py('event','order' ,{'id':py_orderId,'money':py_orderPrice,
                'items':[{'id':py_orderLuId,'count':py_dayCount,'price':py_orderPrice}]
            }).track('xQ.Muh.TbZjtjcFPTDxVQ0fmCGYjP');
        }
        //regsuccess
        if($('#actionName').val() == 'Front_Register_SuccessPage'){
            py('event','register',$('#encryptUid').val()).track('xQ.Quh.Oi-Gt0Aj2UkDajbbMUJsvP');
        }
    }
    /*pinyou ad end*/


});
// channel statistics
(function () {
    var referrerJson = 'referrerJson';

    function referrerFormat() {
        var RF = {};
        RF.referrer = '';
        RF.sem = function (n) {
            n.utm_term = this.getUrlParam('utm_term');
            n.utm_source = this.getUrlParam('utm_source');
            n.utm_medium = this.getUrlParam('utm_medium');
            n.utm_campaign = this.getUrlParam('utm_campaign');
            n.utm_content = this.getUrlParam('utm_content');
            n.ca_source = 'pc' + n.utm_source + n.utm_content;
            var planid = this.getUrlParam('planid');
            var unitid = this.getUrlParam('unitid');
            var ideaid = this.getUrlParam('ideaid');
            if (planid && ideaid && unitid){
                n.utm_term = 'planid_' + planid + ',unitid_' + unitid + ',ideaid_' + ideaid;
            } 
        };
        RF.getUrlParam = function (paramName) {
            var sURL = decodeURIComponent(window.document.URL.toString().replace(/#/, '&'));
            sURL = sURL + '&';
            var paramStart = sURL.indexOf(paramName);
            if (paramStart == -1) {
                return '';
            }
            var equal = sURL.substr(paramStart + paramName.length, 1);
            if (equal != '=') {
                return '';
            }
            var start = paramStart + paramName.length + 1;
            return sURL.substring(start, sURL.indexOf('&', start));
        };
        RF.getReferrerParam = function (paramName) {
            var r = RF.referrer;
            if (r.indexOf(paramName) == -1) {
                return '';
            }
            var start = r.indexOf(paramName) + paramName.length;
            return r.substring(start, r.indexOf('&', start));
        };
        return RF;
    }

    function domainConfig(domain) {
        var url = new Array();
        url['http://jci.xiaozhustatic1.com/e19061101/www.baidu.com'] = {'ca_source' : 'pcbaiduseo', 'utm_source' : 'baidu', 'key' : ''};
        url['http://jci.xiaozhustatic1.com/e19061101/m.baidu.com'] = {'ca_source' : 'h5baiduseo', 'utm_source' : 'baidu', 'key' : '&title='};
        url['http://jci.xiaozhustatic1.com/e19061101/www.sogou.com'] = {'ca_source' : 'pcsogouseo', 'utm_source' : 'sogou', 'key' : '&query='};
        url['http://jci.xiaozhustatic1.com/e19061101/m.sogou.com'] = {'ca_source' : 'h5sogouseo', 'utm_source' : 'sogou', 'key' : '&keyword='};
        url['http://jci.xiaozhustatic1.com/e19061101/www.so.com'] = {'ca_source' : 'pc360seo', 'utm_source' : '360', 'key' : '?q='};
        url['http://jci.xiaozhustatic1.com/e19061101/m.so.com'] = {'ca_source' : 'h5360seo', 'utm_source' : '360', 'key' : '?q='};
        if (typeof(url[domain]) != 'undefined')
            return url[domain];
        return '';
    }

    var RF = referrerFormat();
    var t = new Date();
    var newRef = {
        ts: Math.floor(t.getTime() / 1000),
        ca_source: '',
        utm_term: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: ''
    };

    if (RF.getUrlParam('utm_source') != '' && RF.getUrlParam('utm_content') != '') {
        RF.sem(newRef);
    } else {
        var referrer = document.referrer;
        if (referrer == '' || referrer.indexOf('http://' + topLevelDomain) == 0 || referrer.indexOf('https://'+topLevelDomain) == 0) {
            return;
        }
        referrer = decodeURIComponent(referrer) + '&';
        RF.referrer = referrer;
        var subStart = 0;
        if (referrer.indexOf('http://') !== -1) {
            subStart = 7;
        } else {
            subStart = 8;
        }
        var curDomain = referrer.substring(subStart, referrer.indexOf('.com') + 4);
        var info = domainConfig(curDomain);
        if (info == '')
            return;
        newRef.ca_source = info.ca_source;
        newRef.utm_source = info.utm_source;
        if (newRef.key != '') {
            newRef.utm_term = RF.getReferrerParam(newRef.key)
        }
        if (newRef.utm_term == '') {
            newRef.utm_term = document.title
        }

    }
    var iframe = document.createElement('iframe');
    iframe.src = window.location.protocol + "//"+topLevelDomain+"/statistics.html?" + referrerJson + "=" + JSON.stringify(newRef);
    iframe.style = "display:none";
    document.body.appendChild(iframe);
}());

