 
 var topLevelDomain = "http://jci.xiaozhustatic1.com/e19061101/xiaozhu.com";
var domain = "http://jci.xiaozhustatic1.com/e19061101/xm.xiaozhu.com";
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











 
 function share_weixin()
{
    $('#weiXinShareDialog').dialog({
        autoOpen:false,
        width : 500,
        resizable: false,
        modal:true,
        position: "center"
    });

    $("#weiXinShareDialog").dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('#weiXinShareDialog').parent().removeClass('ui-widget-content');
    $('#weiXinShareDialog').removeClass('ui-widget-content ui-dialog-content ui-dialog');
    var objId = $('#objid').val();  
    var objType = $('#objtype').val();  
    var shareContentType = $('#sharecontenttype').val();  
    var channel = $('#channel_weixin').val();  
    $.ajax({
        type: "GET",
        url: XZWebUrlWriter.getAjax_ShareAfter(objId,objType,shareContentType,channel),
        success: function(data){
        }
    });
}
$('#sharetool_weixin').hover(
 function(){
    if($("input[name='registersuccess']").val()=='8'){
       $("#shareWeixin").addClass('addshareweixin_code');  
    }
    $("#shareWeixin").show();
 },
 function(){
    $("#shareWeixin").hide();
 }
);
function closeShareDialog()
{
    $("#weiXinShareDialog").dialog("close");
    return false;
}

$("#share").click(function(){
    var remainWord = calRemainWord();
    var wordlimit_b = $('#wordlimit_b').val();
    if(remainWord < 0)
    {
        alert("分享内容超过"+wordlimit_b+"个字！请修改微博内容或者修改分享好友。");
        $(this).hide();
        $('#wordlimit').show();
        return false;
    }
    else 
    {
        $("form[name='shareform']").submit();
    }
})
function calRemainWord()
{
    var channel = $('#channel').val();
    var sinaWeiBo = $('#sinaweibo').val();
    var content_b_num = $("#status").val().length;
    if(channel == sinaWeiBo)
    {
        content_b_num = $("#status").val().length + Math.ceil(($('#shareUrl').val().length)/3) + $("#friendName").val().length;
    }
    var wordlimit_b = $('#wordlimit_b').val();
    var len = parseInt(wordlimit_b) - content_b_num;
    return len;
}
function checkWordCount_ex(id,wordLimit,remark)
{
    var content_num = $("#"+id).val().length;
    var len = parseInt(wordLimit) - content_num;
    if(len < 0)
    {
        alert(remark+"不能超过"+wordLimit+"字");        
        $("#"+id).focus();
        $("#share").attr('disabled',true);
        $("#share").hide();
        $("#wordlimit").show();
    }else
    {
        $("#share").attr('disabled',false);
        $("#share").show();
        $('#wordlimit').hide();
    }
}
function checkWordCount()
{
    var remainWord = calRemainWord();
    if(remainWord >= 0)
    {
        $(".rightip1").html("还可以输入"+remainWord+"字");
        $(".rightip1").show();
        $(".rightip2").hide();
        $("#share").attr('disabled',false);
        $("#share").show();
        $('#wordlimit').hide();
    }
    else 
    {
        $(".rightip2").html("已超过<span class='f16'>"+Math.abs(remainWord)+"</span>个字");
        $(".rightip2").show();
        $(".rightip1").hide();
        $("#share").hide();
        $("#share").attr('disabled',true);
        $("#wordlimit").show();
    }
}
function selectImage(obj,imgUrl)
{
    if(obj.hasClass("no_choice"))
    {
        $('.share_img').children("span").addClass("no_choice");    
        obj.removeClass("no_choice");
        $('#image').val(imgUrl);
    }else
    {
        obj.addClass('no_choice');        
        $('#image').val('');
    }
}

$("#deleteImage").click(function(){
    $('.share_img span').addClass("no_choice");
    $("#image").val('');
})
$("a[name='selectfriend']").each( function(){
    $(this).click(function(){
        if($(this).hasClass("have"))
        {
            $(this).removeClass("have");
        }
        else 
        {
            $(this).addClass("have");
        }
        resetFriendName();
        checkWordCount();
    })
})
function resetFriendName()
{
    var friendname = '';
    $(".share_text").children('a').each(function(){
       if($(this).hasClass("have"))
       {
           friendname += ' '+ '@' + $(this).html();
       }
    })
    $("#friendName").val(friendname);
}
$('#openSharev2').on('click',function(){
    showShareDialog();
});

function showShareDialog(){
    $('.sharev2_mask').show();
    $('#sharev2_pop').show(); 

    $('#sharev2_pop').on('mouseenter','.sharev2_pr',function(){
        $('.sharev2weixin_code').show();
    })
    $('#sharev2_pop').on('mouseleave','.sharev2_pr',function(){
        $('.sharev2weixin_code').hide();
    });
    $('.sharev2_cancel_btn').on('click',function(){
        $('.sharev2_w_522').hide(); 
        $('.sharev2_mask').hide();
    });
    var canClick = true;
    $('#isShareInvite').on('click',function(){
        if(!canClick) return false;
        canClick = false;
        var shareInvite = 'yes';
        if($(this).hasClass('sharev2_pink_select')){
            shareInvite = 'no';
            $(this).addClass('sharev2_gray_select').removeClass('sharev2_pink_select');
        }else{
            $(this).addClass('sharev2_pink_select').removeClass('sharev2_gray_select');
        }
        //var datas = {
        var objId = $('#share_objId').val();
        var objType = $('#share_objType').val();
        var cityId = $('#share_city').val();
        var shareContentType = $('#share_contentType').val();
        var shareInvite = shareInvite;
        var hideWechat  = $('#hideWechat').val() ? 'yes' : '';
        //};
        var html = XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjax_GetShareInfo(objId,objType,shareContentType,cityId,shareInvite,hideWechat),'html');
        if(html){
            $('.sharev2_way').empty().html(html);  
        }
        canClick = true;
    })
}

 
 (function($) {
    $.fn.lazyload = function(options) {
        var settings = {
            threshold: 0,
            lazyImgWidth: 32,
            lazyImgHeight: 32,
            userAttr: "lazy_src"
        };
        if (options) {
            $.extend(settings, options);
        }

        var scrolltop = (document.body.scrollTop || document.documentElement.scrollTop+ 5);
        var visiableArea = $(window).height();
        elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
        for(var i=0; i<elements.length; i++) {
            var imgtop = 0;
            var img = elements[i];

            imgtop = $.getElementTop(img);
            if(imgtop < scrolltop+visiableArea) {
                var truesrc = $(img).attr(settings.userAttr);
                $(img).attr("src", truesrc);
                $(img).attr(settings.userAttr, "finish");
            }
        }
        var obj = (options && options.operationobj != undefined) ?  options.operationobj : $(window)  ;
        obj.scroll(function(){
            var scrolltop = (options && options.operationobj != undefined) ? options.operationobj.scrollTop() : (document.body.scrollTop || document.documentElement.scrollTop+ 5) ;
            var visiableArea = $(window).height();
            elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
            for(var i=0; i<elements.length; i++) {
                var imgtop = 0;
                var img = elements[i];

                imgtop = $.getElementTop(img);
                if(imgtop < scrolltop+visiableArea) {
                    var truesrc = $(img).attr(settings.userAttr);
                    $(img).attr("src", truesrc);
                    $(img).attr(settings.userAttr, "finish");
                }
            }
        });

    };
    $.getElementTop = function(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    };
})(jQuery);
 
  /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery); 
 var _keywordValue = '';
var districtSearchKey = 'E';

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
$(function(){
    var guidForSearchResultCookieName = 'xz_guid_4se';
    if(getCookie(guidForSearchResultCookieName) == ''){
        setCookie(guidForSearchResultCookieName, guid(), 24*60*60*1000*720, '/', '.xiaozhu.com');
    }
});

function getFullDate(date){
    var _FullDate = date;
    if(date < 10)
        _FullDate = 0 + String(date);

    return _FullDate;
}
function searchCity(pageType)
{
   if($('#actionname').val()=='Front_Search'){
     var searchCity = $('#searchcityd').attr("value");
   }else{
     var searchCity = $('#searchcity').attr("value");
   }
   
    var cityDomain = $('#citydomain').attr("value");
    var suggestion_cityDomain = $('#suggestion_citydomain').attr("value");
    if(suggestion_cityDomain != "")
        cityDomain = suggestion_cityDomain;
    var searchKey = $('#searchkey').val();//api name
    var searchPutKey = $('#keyword').val();//user set word
    var searchLid = $('#landmarkid').val();
    var landmarktype = $('#landmarktype').val();
    var defaulturl = $('#defaulturl').val();
    var isOpenBlank = $('#isopenblank').val();
    var abroad      = $('#abroad').val();
    var timeZone    = $('#timeZone').val();
    var jumpUrl = '';
    if(searchKey == _keywordValue)
        searchKey = '';
    if(searchPutKey == _keywordValue || searchPutKey=='输入地点...')
        searchPutKey = '';

    if(!searchCity || searchCity =='城市或目的地' || searchCity == '城市')
    {
        if(abroad == 1){
            $('#tip_searchcity').html("请选择城市");
        }else{
            $('#tip_searchcity').html("请选择城市或目的地");
        }
        $('#tip_searchcity').show();
        return ;
    }
    var searchCityBak = searchCity; 
    searchCity = encodeURI(searchCity); 
    var startDate = $('#startdate').attr('value');
    var endDate = $('#enddate').attr('value');

    var abtest_ABTest4SearchDate = getCookie('abtest_ABTest4SearchDate');
    if (abtest_ABTest4SearchDate == 'b')
    {
        if((startDate == '' || startDate == '请选择入住日期') && (endDate == ''|| endDate == '请选择退房日期'))
        {
            startDate = '';
            endDate = '';
            deleteCookie('startDate','/','.'+topLevelDomain);
            deleteCookie('endDate','/','.'+topLevelDomain);
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        { 
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    else
    {
        if((startDate == '请选择入住日期' && endDate == '请选择退房日期') || (startDate.length < 1 && endDate.length < 1))
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#calendar_btn_s').click();
            return ;
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        { 
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    var   type="^[0-9]*[1-9][0-9]*$";
    var   re   =   new   RegExp(type);


    if(searchCity.match(re) != null)
    {
        $.ajax({
            type:"get",
            url:XZWebUrlWriter.getAjax_CheckLodgeUnitUrl(searchCity),
            async : false,
            success:function(data){
               if(data)
               {
                   var obj = eval("("+data+")");
                    if(obj['error'] == '1')
                   {
                        $('#tip_searchcity').html(obj['errormsg']);
                        $('#tip_searchcity').show();
                        return;
                   }else
                    {
                        if(isOpenBlank == '1')
                        {
                            openNewPage(obj['detailurl']);
                        }else
                        {
                            location.href = obj['detailurl'];
                        }
                        return;
                    }
               }
                
            }
            
        })
    }else
   {
    if(pageType == 'search')
        cityDomain = '';
    $.ajax({
        type: "get",
        url:XZWebUrlWriter.getAjax_CheckSearchConditionUrl(searchCity,cityDomain,startDate,endDate),
        async : false,
        error : function (XMLHttpRequest, textStatus, errorThrown){
            
            revoltReptile(XMLHttpRequest);
        },
        success: function(data,textStatus,XMLHttpRequest) {
            revoltReptile(XMLHttpRequest);
            if(data)
            {
                var dataObj = eval("("+data+")");
                if(dataObj['error'] == '1')
                {
                    if(dataObj['cityInfo'])
                {
                    $('#tip_searchcity').html(dataObj['cityInfo']);
                    $('#tip_searchcity').show();
                };
                if(dataObj['dateInfo'])
                {       
                    $('#tip_enddate').html(dataObj['dateInfo']);
                    $('#tip_enddate').show();
                };
                //setTimeout(function() { $('#tip_searchcity').hide() }, 4000);
                 setTimeout(function() { $('#tip_enddate').hide() }, 4010);
                 if($('#actionname').val()=='Front_Search'){
                        alert('对不起，没有找到相应的结果');
                        location.reload();
                      }
                }
                else
                {
                    var city = dataObj['city'] ;
                    var paramArray = new Array();
                    var paramStr = '';
                    if(startDate != '')
                    {
                        paramArray.push('startDate='+startDate);
                    }
                    if(endDate != '')
                    {
                        paramArray.push('endDate='+endDate);
                    }
                    if(searchPutKey != '' && searchPutKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchPutKey)));
                    }
                    else if(searchKey != '' && searchKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchKey)));
                    }

                    
                    paramStr = paramArray.join('&');
                    if(landmarktype == districtSearchKey)
                    {
                        defaulturl = searchLid+"-duanzufang-8/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }
                    if(defaulturl)
                    {
                        defaulturl += "-duanzufang-20/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }

                    if(startDate != '' || endDate != '')
                        paramStr = paramArray.join('&');
                    if(paramStr !='')
                    {
                        if(searchLid)
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(searchKey) + "_" + searchLid + "S-duanzufang-20/"; 
                            else if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/"; 

                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            var paramVal = "";
                            if(searchPutKey)
                            {
                                paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/"; 
                            }
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;

                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                    }
                    else 
                    {
                        if(!searchLid && searchPutKey)
                        {
                            var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/"; 
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else if(searchLid && (searchPutKey || searchKey))
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchKey)) + "_" + searchLid + "S-duanzufang-20/"; 
                            if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/"; 
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/";
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }

                        }
                    }
                }
            }
        }
    });
   }
}

function debug(str){
    if(window.console){
        console.debug(str);
        return;
    }

    var d = $('#debug');
    if(d.length == 0){
        $(document.body).append('<div id="debug"></div>');
        d = $('#debug');
    }

    var item = $('<div></div>').text(str);
    d.append(item);
}
//compare date
function compareDate(date){
    var newDate = date.split("-");
    var dateY = newDate[0];
    var dateM = newDate[1];
    var dateD = newDate[2];
    return Date.parse(dateM + "/" + dateD + "/" + dateY);
}

function checkBankCardNo(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);

    var first15Num=bankno.substr(0,bankno.length-1);
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){   
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  
    var arrJiShu2=new Array(); 

    var arrOuShu=new Array();  
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else 
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();
    var jishu_child2=new Array();
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }       

    var sumJiShu=0; 
    var sumOuShu=0; 
    var sumJiShuChild1=0; 
    var sumJiShuChild2=0; 
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }     
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;       
    var luhm= 10-k;

    if(lastNum==luhm){
        return true;
    }
    else{
        return false;
    }       
}
function is_array(test)  
{  
    if(typeof test == 'object' && typeof test.sort == 'function' && typeof test.length == 'number')  
    {  
        return true;  
    }  
    else  
    {  
        return false;  
    }  
}
function gaClickSta(strEvent)
{
}
function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    splitstring = string.split(" ");
    for(i = 0; i < splitstring.length; i++)
        temp += splitstring[i];
    return temp;
}
function  checkIAgree(){
    $("#tip_affirm").css("display","none");   
}

function check_all(obj){$("input." + obj).each(function(i){this.checked = true;});}
function check_no(obj){$("input." + obj).each(function(i){this.checked = false;});}
function check_fan(obj){$("input." + obj).each(function(i){this.checked = this.checked == true ? false : true;});}
function check_str(obj){str = new String();$("input." + obj).each(function(i){str = this.checked == true ? str + this.value + "," : str;});str = str.substr("0", str.lastIndexOf(","));return str;}

function keyFocus(iptName,defValue)
{

    var _text = $("#"+iptName).val();

    if(_text == defValue)
    {
        $("#"+iptName).attr("value", '');
        $("#"+iptName).attr("style",'color:#555');
    }   
}
function keyBlur(iptName,defValue)
{   
    var _text = $("#"+iptName).val();  
    if(_text == '')
    {
        $("#"+iptName).attr("value",defValue);
        $("#"+iptName).attr("style",'color:#999');
    }
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if(endstr == -1) {
        endstr = document.cookie.length;
    }
    return document.cookie.substring(offset, endstr);
}
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen) {
        j = i + alen;
        if(document.cookie.substring(i, j) == arg){
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if(i === 0){
            break;
        }
    }
    return '';
}
function deleteCookie(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function deleteCookie4Search(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var exp = (argc > 2) ? argv[2] : 90;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    var expires = new Date();
    deleteCookie(name,path,domain);
    if(exp < 365) {
        expires.setTime(expires.getTime() + (exp*24*60*60*1000));
    }else{
        expires.setTime(expires.getTime() + (exp));
    }
    document.cookie = name + "=" + value +
        "; expires=" + expires.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) +
        ((secure === true) ? "; secure" : "");
}
function orderDetail(lodgeId,sameRoomNum,startDate,endDate)
{
    content = '';
    XZWebAjax.get(XZWebUrlWriter.getAjax_GetBookLodgeUnitDetailUrl(lodgeId,sameRoomNum,startDate,endDate),{},false,function(data){
        content = data;
    },'html');
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        //height:520,
        resizable: false,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) 
    { 
        $('#lodgeUnitPriceDetail').dialog({
            bgiframe: true,
            height:520
        });
    } 

    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function priceOrder()
{
    var bookorderid = $("#bookOrderId").val();
    orderPriceDetail(bookorderid);
}

function orderPriceDetail(bookOrderId,url)
{
    var url = (typeof url == "undefined") ? XZWebUrlWriter.getAjax_GetOrderPriceDetailUrl(bookOrderId) : url;
     content = '';
        $.ajax({
            type: "get",
            url: url, 
            async:false,
            success: function(data) {
                content = data;
            }
        });
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        resizable: true,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) 
    { 
        $('#lodgeUnitPriceDetail').dialog({
            height:520
        });
    }
    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function dateTransform(date)
{
    var newDate = new Date(date);
    var dateY = newDate.getFullYear();
    var dateM = getFullDate(newDate.getMonth()+1);
    var dateD = getFullDate(newDate.getDate());
    return dateY + "-" + dateM + "-" + dateD;
}
function getSubCHString(value,len)
{
    if(value.length <= len)
        return value;
    var strlen = 0; 
    var strnum = 0;
    var str = "";
    for(var i = 0;i < value.length;i++)
    {
        strlen ++;
        if(value.charCodeAt(i) <= 128)
        {
            strnum++;
        }
        if(strnum > len)
        {
            strnum = len;
        }
        str += value.charAt(i);
        if(strlen >= (len + strnum)){ 
            return str + '...';
        }
    }
    return str + '...';
}
$(function(){
    window.setTimeout(getLayzeLoadData,1000);
})
function getLayzeLoadData()
{
    var layzeloadObj = $('layzeload');
    if(layzeloadObj.length<0)
    {
        return false;
    }
    layzeloadObj.each(function(){
        var turl = encodeURIComponent($(this).attr('turl'));
        var memkey = $(this).attr('memkey');
        var memtimeout = $(this).attr('memtimeout');
        var jsexecafterload = $(this).attr('jsexecafterload');
        var id = 'load_'+$(this).attr('key');

        XZWebAjax.get(XZWebUrlWriter.getAjax_GetLazyInfoUrl(memkey,memtimeout,turl),{},false,function(data){
            $("#"+id).html(data);
            if (jsexecafterload)
                eval(jsexecafterload);
        },'html');
    })
    return false;
}
function isIe6()
{
    if($.browser.msie && $.browser.version=="6.0")
    {
        return true;
    }
    return false;
}
function changeDate(startDate,days) 
{
    // 参数表示在当前日期下要增加的天数
    var now = new Date(startDate.replace(/-/g, "/"));
    // + 1 代表日期加，- 1代表日期减
    now.setDate((now.getDate() + 1 * days));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}
function openNewPage(url)
{
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "openwin");
    document.body.appendChild(a);
    a.click();
}
function ajaxHandleCall(req,callback)
{
    if(!req || "object" !== typeof req)
    {
        return false;    
    }

    $.ajax({
        tyep : req.type,
        url : req.url,
        data : req.data + '&_t=' + new Date().getTime(),
        success : function(data){
            if(data)
            {
                callback(data);    
            }
        }
    });
}
function isDefined(property) 
{
    return 'undefined' !== typeof property;
}
function clickEvent(urlTracker,pageType)
{
    if(!isDefined(pageType) && !isDefined(urlTracker) && !isDefined(_paq))
        return false; 

    urlTracker = 'http://www.trackerlink.com/'+pageType+'/'+urlTracker;
    _paq.push(['trackLink', urlTracker, 'link']);
}
function searchEvent(pageType)
{
    var defaultStartDate = $('#defaultstartdate').val();
    var defaultEndDate = $('#defaultenddate').val();
    var startDate = $('#startdate').val();
    var endDate = $('#enddate').val();
    var url="defaultstartdate="+defaultStartDate+"&defaultenddate="+defaultEndDate+"&startdate="+startDate+"&enddate="+endDate;
    //clickEvent(url, pageType);
}
function flashChecker()
{
    var hasFlash=0;         //是否安装了flash
    var flashVersion=0; //flash版本
    var isIE=/*@cc_on!@*/0;      //是否IE浏览器

    if(isIE)
    {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); 
        if(swf) {
            hasFlash=1;
            VSwf=swf.GetVariable("$version");
            flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]); 
        }
    }else{
        if (navigator.plugins && navigator.plugins.length > 0)
        {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf)
            {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i)
                {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
}
function initDisplayLodgeUnitIndex(luidAndIndex)
{
    clickEvent('luidAndIndex_'+luidAndIndex,'search');
}
function setDialogHeight(dialogId)
{
    var dialogHeight = $("#"+dialogId).height();
    $('#'+dialogId).css({marginTop:'-'+dialogHeight/2+'px'});
    $('.ui-dialog-titlebar').hide();
}
function closeDialog(dialogId)
{
    $("#"+dialogId).dialog("close");
    return false;
}
function dateDiff(date1,date2)
{
    return parseInt((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)); 
}
function CloseWebPage(){  
    if (navigator.userAgent.indexOf("MSIE") > 0) {  //IE浏览器
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
            window.opener = null; window.close();  
        }  
        else {  
            window.open('', '_top'); window.top.close();  
        }  
    }  
    else if (navigator.userAgent.indexOf("Firefox") > 0) {  //火狐浏览器
        window.location.href = 'about:blank ';  
    }  
    else {     //其他浏览器
        window.opener = null;   
        window.open('', '_self', '');  
        window.close();  
    }  
}  

function chkstrlen(str) {     //检查输入的真实姓名的长度
    var strlen = 0;
    for(var i = 0;i < str.length; i++) {
        if(str.charCodeAt(i) > 255) { //如果是汉字，则字符串长度加2
            strlen += 2;
        }
        else { 
            strlen++;
        }
    }
    return   strlen;
}
//校验姓名
function chkName(str){
   var regName =/^[\u4e00-\u9fa5,\·]{2,10}$/;
   if(regName.test(str)){
      return true;
   }else{
      return false
   }
}
//校验身份证
function chkIdCard(str){
   var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   if(regIdNo.test(str)){
      return true
   }else{
      return false
   }

}
function scrollPage(obj)
{
    var windowHeight = $(window).height();
    var offsetTop = parseInt(obj.offset().top);
    var scrollTop = $(document).scrollTop();
    var suggestionHeight = obj.height();
    if( (windowHeight - (offsetTop - scrollTop)) - suggestionHeight < 0 ) {
        var newTopHeight = scrollTop + (suggestionHeight + 10 ) - (windowHeight - (offsetTop - scrollTop)); 
        $('html,body').animate({ scrollTop: newTopHeight }, 300);
    }

}

function numToStr(n,num) {
    numStr = num.toString();
    var l = numStr.length;
    for (var i=1; i<= n - l;++i) {
        numStr = '0'+numStr;
    }
    return numStr;
}

Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str = str.replace(/yyyy|YYYY/,this.getFullYear());
    str = str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str = str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str = str.replace(/M/g,this.getMonth()+1);

    str = str.replace(/w|W/g,Week[this.getDay()]);

    str = str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str = str.replace(/d|D/g,this.getDate());

    str = str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str = str.replace(/h|H/g,this.getHours());
    str = str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str = str.replace(/m/g,this.getMinutes());

    str = str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str = str.replace(/s|S/g,this.getSeconds());

    return str;
};


function revoltReptile(XMLHttpRequest){
    var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
    if(reaponseHeader){
        window.location.href = reaponseHeader;
    }
};


 
 /**
 * Created by xiaozhu on 2016/11/30.
 */
var xzweb = {};
xzweb.ui = {};
xzweb.ui.alert = function(content,buttonName,callback){
    content = content || '弹层提示';
    buttonName = buttonName || '我知道了';
    var boxHtml = '<div id="xzweb_ui_alert_container"><div id="xzweb_ui_alert" class="pop_320">'
        + '<p class="xzweb_ui_alert_content">' + content + '</p>'
        + '<p><a class="pop_confirm">' + buttonName + '</a></p>'
        + '</div>'
        + '<div class="mask" style="position:fixed; left:0; top:0; z-index:6667; width:100%; height:100%; opacity:0.9; filter:alpha(opacity=90); background-color:#415161;"></div></div>';

    $('body').append(boxHtml);
    $(document.body).css("overflow","hidden");
    var alertBox = $('#xzweb_ui_alert');
    alertBox.css({
        position : 'fixed',
        left : ($(window).width() - alertBox.width())/2,
        top : ($(window).height() - alertBox.height())/2,
        'z-index':9999
    });
    alertBox.find('.pop_confirm').click(callback || function(){
            alertBox.parent('#xzweb_ui_alert_container').remove();
            $(document.body).css("overflow","visible");
        });
};
 
 var holidayDaysSimple = [
    [1,1,2014, '元旦'],
    [1,30,2014, '除夕'],
    [1,31,2014, '春节'],
    [4,5,2014, '清明'],
    [5,1,2014, '劳动'],
    [6,2,2014, '端午'],
    [9,6,2014, '休'],
    [9,7,2014, '休'],
    [9,8,2014, '中秋'],
    [10,1,2014, '国庆'],
    [10,2,2014, '休'],
    [10,3,2014, '休'],
    [10,4,2014, '休'],
    [10,5,2014, '休'],
    [10,6,2014, '休'],
    [10,7,2014, '休']
];
var holidayDaysSimplecalendar = [
    [1,1,2014, '元旦'],
    [1,30,2014, '除夕'],
    [1,31,2014, '春节'],
    [4,5,2014, '清明'],
    [5,1,2014, '劳动'],
    [6,2,2014, '端午'],
    [9,8,2014, '中秋'],
    [10,1,2014, '国庆']
];
 
 var lastDateArr = new Array();

var today = new Date();
var getAfterDateNumber = 100;
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDate();

var lodgeUnitId = $("#lodgeUnitId").val();
var defaultEnddateVal = "yyyy-mm-dd";

var sFullMonth = getFullDate(String(today.getMonth()+1));
var sFullDay = getFullDate(String(today.getDate()));

var startdate = today.getFullYear() + "-" + sFullMonth + "-" + sFullDay;
var dateAfter = new Date(86400000*getAfterDateNumber+Date.parse(today));

var eFullMonth = getFullDate(String(dateAfter.getMonth()+1));
var eFullDay = getFullDate(String(dateAfter.getDate()));

var enddate = dateAfter.getFullYear() + "-" + eFullMonth + "-" + eFullDay ;
var calendarData = [];
var calendarStockData = {};
var priceEdit = [];
var datepickerType = 0;
var isNoPrice = 0;
var isHoverNoPrice = 0;
var hasNoPrice = 0;
$(function(){
    var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();

    $('#calendar_btn_s').click(function(){
        if (!$("#ui-datepicker-div").html() || $("#ui-datepicker-div").is(":hidden"))
            $("#startdate").datepicker('show');
        else
            $("#startdate").datepicker('hide');
    });
    $('#calendar_btn_e').click(function(){
        if (!$("#ui-datepicker-div").html() || $("#ui-datepicker-div").is(":hidden"))
            $("#enddate").datepicker('show');
        else
            $("#enddate").datepicker('hide');
    });

    // var url = XZWebUrlWriter.getAjax_GetLodgeUnitCalendar(lodgeUnitId,startdate,enddate,calendarCode);
    // XZWebAjax.post(url,{},true,function(data){
    //     for(var i in data){
    //         if(data[i].state == 'unavailable'){
    //             calendarData.push(data[i].start);
    //         }
    //         if(data[i].pricetype== 'fixedprice')
    //         {
    //             priceEdit.push(data[i].start);
    //         }
    //         calendarStockData[data[i].start] = data[i].housenum;
    //     }
    // });

    var inst = null;
    var dates = $("#startdate,#enddate").datepicker({
        /*datepicker{{{*/
        minDate: new Date(year, month, day),
        numberOfMonths: 2,
        showAnim : 'slideDown',
        beforeShowDay: setScheduledDays,
        hideIfNoPrevNext: true,
        monthNames:["01","02","03","04","05","06","07","08","09","10","11","12"],
        monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        dayNamesShort:["日","一","二","三","四","五","六"],
        dayNamesMin:["日","一","二","三","四","五","六"],
        holidayDaysSimple:holidayDaysSimplecalendar,
        dateFormat:"yy-mm-dd",
        showMonthAfterYear:true,
        onSelect: function( selectedDate ) {
            var option = this.id == "startdate" ? "minDate" : "maxDate",
                instance = $( this ).data( "datepicker" ),
                date = $.datepicker.parseDate(
                    instance.settings.dateFormat ||
                    $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings ),
                date2 = $.datepicker.parseDate(
                    instance.settings.dateFormat ||
                    $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings );
            if(this.id == "startdate"){
                datepickerType = 0;
                $('#isNoPrice').val(0);
                date.setDate(new Date(date.getDate()+1));
                date2.setDate(new Date(date2.getDate()+1));
                var startdateVal = $("#startdate").val();
                var enddateVal = $("#enddate").val();
                if('undefined' != typeof(enddateVal)){
                    if(enddateVal == defaultEnddateVal || compareDate(checkDate(date2)) > compareDate(enddateVal)){
                        $("#enddate").val(checkDate(date2));
                    }
                }
                dates.not( this ).datepicker( "option", option, date );
                $('#enddate').val('退房日期');
            }
            if(this.id == "enddate"){
                datepickerType = 1;
            }
            $(this).change();
        },
        beforeShow : function(ele,obj){
            if(obj.id == "startdate")
                datepickerType = 0;
            if(obj.id == "enddate")
                datepickerType = 1;
            setSelectedDays();
            if (datepickerType == 1 && $('#startdate').val() != '' && $('#startdate').val() != '入住日期') {
                if ($('.ui-state-default-sp').last().parent().hasClass('XZ_dz_noPrice')) {
                    $('.ui-state-default-sp').last().addClass('red border_red').text('已租');
                } else {
                    $('.ui-state-default-sp').last().addClass('selected-day-hover').parent().addClass('selected-day-highlight');
                }
            }
        },
        onClose:function(str,obj){
            isNoPrice = 0;
            hasNoPrice = 0;
            if(obj.id == "startdate" && $('#startdate').val() != '入住日期')
                $('#enddate').datepicker('show');
        }
    /*}}}*/
    });
    $('#ui-datepicker-div').delegate(".ui-state-default","mouseleave",function(){
        isHoverNoPrice = 0;
        isNoPrice = 0;
        $("td").children().removeClass('bcg_red');
        $('.ui-state-default').each(function(){
            if (!$(this).parent().hasClass('ui-state-disabled')) {
                $(this).removeClass('ui-state-hover red white').parent().removeClass('ui-state-highlight');
            }
            if ($(this).parent().hasClass('XZ_dz_noPrice')) {
                $(this).text(($(this).attr('holidaysimplename') != '') ? $(this).attr('holidaysimplename') : $(this).attr('data-day'));
            }
            $(this).removeClass('border_red border_green');
        });
    });
    $('#ui-datepicker-div').delegate("a","mouseenter",function(){
        if ($(this).parent().hasClass('XZ_dz_noPrice')) {
            $(this).removeClass('ui-state-hover');
        }
        if ($(this).parent().hasClass('XZ_dz_promotion')){
            $(this).addClass('XZ_dz_promotion isPromotionClass');
        }
        var noPriceCount = 0;
        if (datepickerType == 1){
            var tdEndObj = $(this).parent();
            var endDateObj = new Date(tdEndObj.attr('data-year'),tdEndObj.attr('data-month'),$(this).attr('data-day'));
            var endDateStamp = endDateObj.getTime();
            if (!tdEndObj.hasClass('ui-state-disabled')) {
                var startdateval = $('#startdate').val();
                var startdatevalArr = new Array();
                if (startdateval != '' && startdateval !='入住日期' && startdateval != undefined) {
                    startdatevalArr = startdateval.split('-');
                    startdatevalArr[0] = startdatevalArr[0].replace(/[^0-9]/ig,"");
                    startdatevalArr[2] = startdatevalArr[2].replace(/[^0-9]/ig,"");
                    var startDateObj = new Date(startdatevalArr[0],(Number(startdatevalArr[1])-Number(1)),startdatevalArr[2]);
                    var startDateStamp = startDateObj.getTime();
                    $('.ui-state-default').each(function(){
                        var tdObj = $(this).parent();
                        var tdDateObj = new Date((tdObj.attr('data-year') ? tdObj.attr('data-year') : startdatevalArr[0]),(tdObj.attr('data-month') ? tdObj.attr('data-month') : (Number(startdatevalArr[1])-Number(1))),$(this).attr('data-day'));
                        var tdDateStamp = tdDateObj.getTime();
                        if (tdDateStamp >= startDateStamp && tdDateStamp <= endDateStamp) {
                            if (tdObj.hasClass('XZ_dz_noPrice')){
                                $(this).addClass('red border_red').text('已租');
                                isHoverNoPrice = 1;
                                noPriceCount++;
                            } else {
                                tdObj.addClass('ui-state-highlight');
                                $(this).addClass('ui-state-hover border_green');
                            }
                            if (tdObj.attr('data-year') > startdatevalArr[0]) {
                                if (hasNoPrice == 1) {
                                    isNoPrice = 1;
                                    isHoverNoPrice = 1;
                                }
                            } else {
                                if (Number(tdObj.attr('data-month')) > Number(startdatevalArr[1])) {
                                    if (hasNoPrice == 1) {
                                        isNoPrice = 1;
                                        isHoverNoPrice = 1;
                                    }
                                }
                            }
                        }
                    });
                    if ($('.ui-state-default-sp').last().parent().hasClass('XZ_dz_noPrice')) {
                        isNoPrice = 1;
                        isHoverNoPrice = 1;
                        noPriceCount++;
                    }
                    if ($.inArray(startdateval,lastDateArr) != -1){
                        isNoPrice = 1;
                        isHoverNoPrice = 1;
                    }
                    if ((isHoverNoPrice > 0 || isNoPrice > 0) || $('#isNoPrice').val() == 1) {
                        $('.ui-state-default').each(function(){
                            var tdObj = $(this).parent();
                            var tdDateObj = new Date((tdObj.attr('data-year') ? tdObj.attr('data-year') : startdatevalArr[0]),(tdObj.attr('data-month') ? tdObj.attr('data-month') : (Number(startdatevalArr[1])-Number(1))),$(this).attr('data-day'));
                            var tdDateStamp = tdDateObj.getTime();
                            if (tdDateStamp <= endDateStamp) {
                                $(this).addClass('gray');
                            }
                            if ($(this).hasClass('selected-day-hover')) {
                                $(this).removeClass('gray');
                            }
                            if (tdDateStamp >= startDateStamp && tdDateStamp <= endDateStamp) {
                                $(this).removeClass('gray');
                                if (!tdObj.hasClass('XZ_dz_noPrice')){
                                    $(this).removeClass('ui-state-hover ui-state-active border_green');
                                    $(this).addClass('bcg_red border_red');
                                }
                            }
                        });
                        if (!$('.ui-state-default-sp').last().parent().hasClass('XZ_dz_noPrice')) {
                            $('.ui-state-default-sp').last().addClass('bcg_red');
                        } else {
                            $('.ui-state-default-sp').last().addClass('border_red');
                        }
                    }
                }
                var firstTd = $('.ui-state-default').first();
                var firstTdObj = new Date(firstTd.parent().attr('data-year'),firstTd.parent().attr('data-month'),firstTd.attr('data-day'));
                var firstTdDateStamp = firstTdObj.getTime();
                if (firstTdDateStamp > startDateStamp && (startdatevalArr[0] <= firstTd.parent().attr('data-year')) && ((Number(startdatevalArr[1])-Number(1)) != Number(firstTd.parent().attr('data-month'))) && hasNoPrice == 1) {
                    return;
                }

                if (tdEndObj.index() > 0 && !tdEndObj.prev().hasClass('XZ_dz_noPrice') && tdEndObj.hasClass('XZ_dz_noPrice') && $.inArray(startdateval,lastDateArr) == -1 && noPriceCount == 1){
                    $(this).removeClass('red border_red').addClass('white border_green').parent().removeClass('selected-day-highlight');
                    $(this).text($(this).attr('holidaysimplename') != '' ? $(this).attr('holidaysimplename') : $(this).attr('data-day'));
                    $('td').children().removeClass('bcg_red border_red');
                } else if (tdEndObj.index() == 0 && !tdEndObj.parent().prev().children().last().hasClass('XZ_dz_noPrice') && tdEndObj.hasClass('XZ_dz_noPrice') && $.inArray(startdateval,lastDateArr) == -1 && noPriceCount == 1){
                    $(this).removeClass('red border_red').addClass('white border_green').parent().removeClass('selected-day-highlight');
                    $(this).text($(this).attr('holidaysimplename') != '' ? $(this).attr('holidaysimplename') : $(this).attr('data-day'));
                    $('td').children().removeClass('bcg_red border_red');
                }
            }
        } else {
            if ($(this).parent().hasClass('XZ_dz_noPrice')){
                $(this).addClass('red border_red').text('已租');
            }
        }
    });
});
function checkDate(date)
{
    var newDate = new Date(date);
    var dateY = newDate.getFullYear();
    var dateM = getFullDate(newDate.getMonth()+1);
    var dateD = getFullDate(newDate.getDate());
    return dateY + "-" + dateM + "-" + dateD;
}
function setScheduledDays(date)
{
    var month = getFullDate(String(date.getMonth()+1));
    var day = getFullDate(date.getDate());

    var thisDate = date.getFullYear() + "-" + month + "-" + day;
    var isScheduled = false;
    var isNoPriceDay = false;
    var isPromotion = false;
    var title = "";
    // Check for scheduled day
    for (i=0;i<holidayDaysSimple.length;i++)
    {
        if (date.getMonth() == (holidayDaysSimple[i][0] -1) && date.getDate() == holidayDaysSimple[i][1] && date.getFullYear() == holidayDaysSimple[i][2])
        {
            isScheduled = true; // true: set scheduled color
            title = holidayDaysSimple[i][3];
        }
    }
    if($.inArray(thisDate,calendarData) != -1)
    {
        isNoPriceDay = true;
    }

    if($.inArray(thisDate,priceEdit) != -1)
    {
        isPromotion = true;
    }

    if(today > date){
        if(today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate())
        {
            if(isNoPriceDay){
                return [true, 'XZ_dz_noPrice', ''];
            }
            else if(isPromotion){
                return  [true, 'XZ_dz_promotion', ''];
            }
            else{
                return [true, 'XZ_dz_thisDay','']
            }
        }

        return [false, 'XZ_dz_beforToday'];
    }else if (isNoPriceDay){
        //return [false, 'XZ_dz_noPrice', '不可预订'];
        return [true, 'XZ_dz_noPrice', ''];
    }
    else if(isPromotion){
        return  [true, 'XZ_dz_promotion', ''];
    }
    else if (isScheduled){
        return [true, "PEND", ''];
    }
    else{
        return [true, 'XZ_dz_havePrice'];
    }
}
function setSelectedDays() {
    var noPriceCount = 0;
    var thisDateVal = '';
    var firstMonthLastDate = $('.ui-datepicker-group-first tr').last().find('.ui-state-default').last();
    var lastMonthLastDate = $('.ui-datepicker-group-last tr').last().find('.ui-state-default').last();
    if(firstMonthLastDate.last().parent().hasClass('XZ_dz_noPrice')){
        var firstMonthLastDateVal = checkDate(new Date(firstMonthLastDate.parent().attr('data-year'),firstMonthLastDate.parent().attr('data-month'),firstMonthLastDate.attr('data-day')));
        if ($.inArray(firstMonthLastDateVal,lastDateArr) == -1) {
            lastDateArr.push(firstMonthLastDateVal);
        }
    }
    if(lastMonthLastDate.last().parent().hasClass('XZ_dz_noPrice')){
        var lastMonthLastDateVal = checkDate(new Date(lastMonthLastDate.parent().attr('data-year'),lastMonthLastDate.parent().attr('data-month'),lastMonthLastDate.attr('data-day')));
        if ($.inArray(lastMonthLastDateVal,lastDateArr) == -1) {
            lastDateArr.push(lastMonthLastDateVal);
        }
    }
    var startdateval = $('#startdate').val();
    var enddateval = $('#enddate').val();
    var startdatevalArr = new Array();
    var enddatevalArr = new Array();
    if (startdateval != '' && startdateval !='入住日期' && enddateval != '' && enddateval !='退房日期') {
        startdatevalArr = startdateval.split('-');
        var startDateObj = new Date(startdatevalArr[0],(Number(startdatevalArr[1])-Number(1)),startdatevalArr[2]);
        var startDateStamp = startDateObj.getTime();
        enddatevalArr = enddateval.split('-');
        var endDateObj = new Date(enddatevalArr[0],(Number(enddatevalArr[1])-Number(1)),enddatevalArr[2]);
        var endDateStamp = endDateObj.getTime();
        $('.ui-state-default').each(function(){
            var tdObj = $(this).parent();
            var tdDateObj = new Date((tdObj.attr('data-year') ? tdObj.attr('data-year') : startdatevalArr[0]),(tdObj.attr('data-month') ? tdObj.attr('data-month') : (Number(startdatevalArr[1])-Number(1))),$(this).attr('data-day'));
            var tdDateStamp = tdDateObj.getTime();
            if (tdDateStamp >= startDateStamp && tdDateStamp <= endDateStamp) {
                if (tdObj.hasClass('XZ_dz_noPrice')){
                    thisDateVal = checkDate(new Date($(this).parent().attr('data-year'),$(this).parent().attr('data-month'),$(this).attr('data-day')));
                    if ($.inArray(thisDateVal,lastDateArr) == -1) {
                        lastDateArr.push(thisDateVal);
                    }
                    isNoPrice = 1;
                    noPriceCount++;
                } else {
                    tdObj.addClass('ui-state-highlight');
                    $(this).addClass('ui-state-hover');
                }
            }
            if (tdDateStamp >= startDateStamp) {
                if (tdObj.hasClass('XZ_dz_noPrice')){
                    hasNoPrice = 1;
                }
            }
            if ($(this).parent().hasClass('XZ_dz_promotion')){
                $(this).addClass('XZ_dz_promotion isPromotionClass');
            }
            if (datepickerType == 1 && tdDateStamp <= startDateStamp) {
                $(this).parent().removeClass('ui-state-highlight').attr('data-event','').addClass('ui-datepicker-unselectable ui-state-disabled XZ_dz_beforToday');
                $(this).after('<span class="ui-state-default-sp" data-day="'+$(this).attr('data-day')+'">'+$(this).text()+'</span>');
                $(this).remove('a');
            }
        });
        $('.ui-state-default-sp').each(function(){
            if ($(this).parent().hasClass('XZ_dz_promotion')){
                $(this).parent().removeClass('XZ_dz_promotion').addClass('isPromotionMark');
            }
            if ($(this).parent().hasClass('XZ_dz_noPrice')){
                $(this).parent().removeClass('XZ_dz_noPrice').addClass('XZ_dz_beforToday noPriceMark');
            }
            $(this).parent().addClass('XZ_dz_beforToday');
        });
        if (datepickerType == 1 && $('.ui-state-default-sp').last().parent().hasClass('isPromotionMark')) {
            $('.ui-state-default-sp').last().addClass('XZ_dz_promotion');
        }
        if ($('.ui-state-default-sp').last().parent().hasClass('noPriceMark')) {
            $('.ui-state-default-sp').last().addClass('red border_red').text('已租').parent().addClass('XZ_dz_noPrice').removeClass('XZ_dz_beforToday noPriceMark');
            thisDateVal = checkDate(new Date(year,month,$('.ui-state-default-sp').last().attr('data-day')));
            if ($.inArray(thisDateVal,lastDateArr) == -1) {
                lastDateArr.push(thisDateVal);
            }
            noPriceCount++;
        }

        if (isNoPrice > 0 || $('#isNoPrice').val() == 1) {
            if (datepickerType == 1 && !$('.ui-state-default-sp').last().parent().hasClass('XZ_dz_noPrice')) {
                $('.ui-state-default-sp').last().addClass('bcg_red');
            }
            $('.ui-state-default').each(function(){
                var tdObj = $(this).parent();
                var tdDateObj = new Date((tdObj.attr('data-year') ? tdObj.attr('data-year') : startdatevalArr[0]),(tdObj.attr('data-month') ? tdObj.attr('data-month') : (Number(startdatevalArr[1])-Number(1))),$(this).attr('data-day'));
                var tdDateStamp = tdDateObj.getTime();
                if (tdDateStamp >= startDateStamp && tdDateStamp <= endDateStamp) {
                    if (!tdObj.hasClass('XZ_dz_noPrice')){
                        $(this).removeClass('ui-state-hover ui-state-active border_green');
                        $(this).addClass('bcg_red');
                    } else {
                        $(this).text('已租').addClass('red border_red');
                    }
                }
                if (tdDateStamp == endDateStamp) {
                    if ($.inArray(startdateval,lastDateArr) != -1) {
                        return true;
                    }
                    var firstTd = $('.ui-state-default').first();
                    var firstTdObj = new Date(firstTd.parent().attr('data-year'),firstTd.parent().attr('data-month'),firstTd.attr('data-day'));
                    var firstTdDateStamp = firstTdObj.getTime();
                    if (firstTdDateStamp > startDateStamp && (startdatevalArr[0] <= firstTd.parent().attr('data-year')) && ((Number(startdatevalArr[1])-Number(1)) != Number(firstTd.parent().attr('data-month'))) && hasNoPrice == 1) {
                        return;
                    }
                    if (tdObj.index() > 0 && !(tdObj.prev().hasClass('XZ_dz_noPrice')) && tdObj.hasClass('XZ_dz_noPrice') && noPriceCount == 1){
                        $(this).removeClass('red border_red').addClass('white border_green').text(($(this).attr('holidaysimplename') != '') ? $(this).attr('holidaysimplename') : $(this).attr('data-day'));
                        $('td').children().removeClass('bcg_red');
                    } else if (tdObj.index() == 0 && !(tdObj.parent().prev().children().last().hasClass('XZ_dz_noPrice')) && tdObj.hasClass('XZ_dz_noPrice') && noPriceCount == 1){
                        $(this).removeClass('red border_red').addClass('white border_green').text(($(this).attr('holidaysimplename') != '') ? $(this).attr('holidaysimplename') : $(this).attr('data-day'));
                        $('td').children().removeClass('bcg_red');
                    }
                }
            });
        }
    } else {
        if (startdateval != '' && startdateval !='入住日期'){
            if (datepickerType == 1){
                startdatevalArr = startdateval.split('-');
                var startDateObj = new Date(startdatevalArr[0],(Number(startdatevalArr[1])-Number(1)),startdatevalArr[2]);
                var startDateStamp = startDateObj.getTime();
                $('.ui-state-default').each(function(){
                    var tdObj = $(this).parent();
                    var tdDateObj = new Date((tdObj.attr('data-year') ? tdObj.attr('data-year') : startdatevalArr[0]),(tdObj.attr('data-month') ? tdObj.attr('data-month') : (Number(startdatevalArr[1])-Number(1))),$(this).attr('data-day'));
                    var tdDateStamp = tdDateObj.getTime();
                    if ($(this).parent().hasClass('XZ_dz_promotion')){
                        $(this).addClass('XZ_dz_promotion isPromotionClass');
                    }
                    if (tdDateStamp <= startDateStamp) {
                        $(this).parent().removeClass('ui-state-highlight XZ_dz_promotion').attr('data-event','').addClass('ui-datepicker-unselectable ui-state-disabled XZ_dz_beforToday');
                        $(this).after('<span class="ui-state-default-sp" data-day="'+$(this).attr('data-day')+'">'+$(this).text()+'</span>');
                        $(this).remove('a');
                    }
                    if (tdDateStamp >= startDateStamp) {
                        if ($(this).parent().hasClass('XZ_dz_noPrice')){
                            thisDateVal = checkDate(new Date($(this).parent().attr('data-year'),$(this).parent().attr('data-month'),$(this).attr('data-day')));
                            if ($.inArray(thisDateVal,lastDateArr) == -1) {
                                lastDateArr.push(thisDateVal);
                            }
                        }
                        if (tdObj.hasClass('XZ_dz_noPrice')){
                            hasNoPrice = 1;
                        }
                    }
                });
            }
            $('.ui-state-default-sp').each(function(){
                if ($(this).parent().hasClass('XZ_dz_promotion')){
                    $(this).parent().removeClass('XZ_dz_promotion').addClass('XZ_dz_beforToday isPromotionMark');
                }
                if ($(this).parent().hasClass('XZ_dz_noPrice')){
                    $(this).parent().removeClass('XZ_dz_noPrice').addClass('XZ_dz_beforToday noPriceMark');
                }
                $(this).parent().addClass('XZ_dz_beforToday');
            });
            if ($('.ui-state-default-sp').last().parent().hasClass('noPriceMark')) {
                $('.ui-state-default-sp').last().addClass('red border_red').text('已租').parent().addClass('XZ_dz_noPrice').removeClass('XZ_dz_beforToday noPriceMark');
            }
            if ($('.ui-state-default-sp').last().parent().hasClass('XZ_dz_noPrice')) {
                thisDateVal = checkDate(new Date(year,month,$('.ui-state-default-sp').last().attr('data-day')));
                if ($.inArray(thisDateVal,lastDateArr) == -1) {
                    lastDateArr.push(thisDateVal);
                }
            }
            if ($('.ui-state-default-sp').last().parent().hasClass('isPromotionMark')){
                $('.ui-state-default-sp').last().addClass('XZ_dz_promotion');
            }
        }
    }

}
 
 function blurImageCode(phone)
{
    var checkcode = $('#imagecode').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        async: false,
        success:function(data){
            var dataObj=eval("("+data+")");
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                flag = true;
                return true;
            } else {
                $('#tip_imagecode').html(dataObj.errmsg).show();
                $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}
function blurImageCodeInfo(phone)
{
    var checkcode = $('#imagecodeInfo').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        dataType : 'json',
        async: false,
        success:function(dataObj){
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                 $('#imagecodeInfo').removeClass('bor_red');
                flag = true;
                return true;
            } else {
                $('#imagecodeInfo').addClass('bor_red');
                $('#tip_imagecode').html('<i></i>' + dataObj.errmsg).show();
                $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}

function resetCheckcode(imageID,imagecode) 
{ 
    XZWebUrlWriter.getRequest(XZWebUrlWriter.headTest_ReqUrl());
    if(imageID == '' || typeof(imageID)=='undefined')
        imageID='img_imagecode';

    if(imagecode == '' || typeof(imagecode)=='undefined')
        imagecode='imagecode';

    $('#'+imageID).attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
    $('#'+imagecode).val('');   
    return false;
}

 
 $('.alipay_trust').mouseover(function(){
    $('#alipay-trust-box').show();
})
$('#alipay-trust-box').mouseout(function(){
    $('#alipay-trust-box').hide();
})
jQuery.fn.isChildAndSelfOf = function(b){
    return (this.closest(b).length > 0);
};
$(document).click(function(ev){
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
    if($('#alipay-trust-box').is(':visible')){
        if($(target).isChildAndSelfOf(".alipay_trust") || /^zminfo_pair$/.test(target.id)) {
            return;
        }
        $('#alipay-trust-box').hide();
    }
});

$('#zminfo_pair').click(function(){
    var applyUserId = $(this).attr('loginuserid');
    var ownerUserId = $(this).attr('landlordid');
    $.ajax({
         type: "get",
         url: "/ajaxRequest/Ajax_GetZminfo_Pair",
         async:false,
         datatype:'json',
         data: "applyUserId="+applyUserId+"&ownerUserId="+ownerUserId+"&rand="+new Date().getTime(),
         success: function(data) {
            var dataObj=eval("("+data+")");
            if (dataObj && dataObj.status == 0) {
                alert(dataObj.errmsg);
                return false;
            } else {
                var succHtml = '<h2 class="zhima_h2 marginT20">他的芝麻分：'+dataObj.sucmsg+'</h2>';
                $('#zminfo_pair').remove();
                $('.zhima_btm').before(succHtml);
                $('.zhima_con').show();
            }
         }
    });
});
 
 function dateDiff(strInterval, dtStart, dtEnd) {
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's' :return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :return ((dtEnd.getMonth()+1)+(dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}
var numToStr = function(n,num) {
    numStr = num.toString();
    var l = numStr.length;
    for (var i=1; i<= n - l;++i) {
        numStr = '0'+numStr;
    }
    return numStr;
};
var newfiexdPrice = $('#newfiexdPrice').val();
try{
    var calendarV2 = function(e, options) {
        options = options || {};

        this.classWeek   = options.classWeek || 'calendar-week';
        this.classTitle   = options.classTitle || 'calendar_tit';
        this.classMonth   = options.classMonth || 'calendar_l';
        this.classDay   = options.classDay || 'calendar-day';
        this.classDayBase   = options.classDayBase || 'col_base';
        this.classDayShow   = options.classDayShow || 'show-date';
        this.classDayHasRented = options.classDayHasRented || 'yz';
        this.classDaySelect = options.classDaySelect || 'z';
        this.classDayPass = options.classDayPass || 'col_gray';
        this.classDayUnSelectAble = options.classDayUnSelectAble || 'yz';
        this.classDaySpecial = options.classDaySpecial || 'cur';
        this.classPink = options.classPink || 'col_pink';
        this.classTable = options.classTable || 'calendar_table';
        this.prependHtml   = options.prependHtml || '';
        this.today   = options.today || new Date();

        this.fillDayInfo = options.fillDayInfo || null;
        this.getDayInfo  = options.getDayInfo || null;

        this.checkState = 0;
        this.doColor = false;

        this.checkIn      = options.checkIn || null;
        this.checkOut     = options.checkOut || null;
        this.checkDayChange = options.checkDayChange || function(){};
        this.setDay = new Date();
        this.minDay = $('#minDay').val();
        this.maxDay = $('#maxDay').val();

        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.clearDateHtml   = '';
        this.preMonthHtml   = '';
        this.nextMonthHtml   = '';
        this.totalMohth     = 2;
        this.firstGray = false;
        this.isAbroad = options.isAbroad || false;

        this.e = typeof(e) == 'object' ? e : $(e);

        this.init();

        return(this);
    };
    calendarV2.prototype.init = function(initAtWhen) {
        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.checkState = 0;

        var that = this;
        $('#startenddate, #detailCalendarIco').on('click', function(){
            that.dateArray      = [];
            that.monthArray     = [];
            that.calenderHTML   = '';
            that.checkState = 0;
            var afterVerifyAction = function () {
                that.gengerateCalArray(true,initAtWhen).gengerateCalHtml().fillCalender();
                that.bindEvent();
                // if (localStorage.getItem('SAFE_CHECKED_calendar') === 'yes') {
                  $('#calendar-box').show();
                // }
            };
            // 自动化测试忽略滑动验证
            if (cookieApi.getCookie('isAutoTest') === 'yes') {
                afterVerifyAction();
            } else {
                var spiderToken = localStorage.getItem('SPIDER_AVOID_TOKEN_calendar');
                if (spiderToken && spiderToken !== 'undefined') {
                    afterVerifyAction();
                } else {
                    var captcha = new Captcha({
                        init: window.captchaModel.showModel,
                        onSuccess: function () {
                            window.captchaModel.hideModel();
                            setTimeout(function () {
                                afterVerifyAction();
                            }, 1000);
                        },
                        busiKey: 'calendar'
                    });
                }
            }
        });

        return(this);
    };
    calendarV2.prototype.preMonth = function() {
        if((this.today.getMonth() == this.firstDate.m) && (this.today.getFullYear() == this.firstDate.y) ){
            return false;
        }
        else {
            this.setDay.setDate(1);
            (this.firstDate.m == 0) ? (this.setDay.setMonth(11)) : this.setDay.setMonth(this.firstDate.m-1);
            (this.firstDate.m == 0) ? (this.setDay.setFullYear(this.firstDate.y-1)) : this.setDay.setFullYear(this.firstDate.y);
            this.dateArray      = [];
            this.monthArray     = [];
            this.calenderHTML   = '';
            this.checkState = 0;
            this.gengerateCalArray(false).gengerateCalHtml().fillCalender();
            this.bindEvent();
            return(this);
        }
    };
    calendarV2.prototype.nextMonth = function() {
        this.setDay.setDate(1);
        (this.lastDate.m == 0) ? this.setDay.setMonth(11) : (this.setDay.setMonth(this.lastDate.m-1));
        (this.lastDate.m == 0) ? this.setDay.setFullYear(this.lastDate.y-1) :this.setDay.setFullYear(this.lastDate.y);
        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.checkState = 0;
        this.gengerateCalArray(false).gengerateCalHtml().fillCalender();
        this.bindEvent();
        return(this);
    };
    calendarV2.prototype.setYmd = function(y,m,d, isDisplay) {
        var cdate = new Date();
        this.setDay = new Date();
        m = isDisplay ? m - 1 : m;
        cdate.setDate(1);
        cdate.setMonth(m);
        cdate.setFullYear(y);
        cdate.setDate(d);
        return cdate;
    };
    calendarV2.prototype.getYmd = function(s) {
        //return s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate();// + '  ' + s.getDay();
        return s.getFullYear() + '-' + numToStr(2,s.getMonth() + 1) + '-' + numToStr(2,s.getDate());// + '  ' + s.getDay();
    };

    calendarV2.prototype.gengerateCalArray = function(turnToCheckInDay,initAtWhen) {
        //this.dateArray = [];
        if(turnToCheckInDay && this.checkIn && this.checkOut) {
            this.setDay = new Date(this.checkIn);
        }
        if(initAtWhen) {
            this.setDay = new Date(initAtWhen);
        }
        for (var i = 0; i <= this.totalMohth; i++) {
            var toMonth = this.setDay.getMonth();
            for (var j = 1; j <= 37; j++) {
                this.setDay.setDate(j);
                if (this.setDay.getMonth() != toMonth){
                    break;
                }
                this.dateArray.push({y:this.setDay.getFullYear(),m:this.setDay.getMonth(),d:this.setDay.getDate(),w:this.setDay.getDay()});
            };
        };
        this.firstDate = this.dateArray[0];
        this.lastDate  = this.dateArray[this.dateArray.length -1];
        return(this);
    };

    calendarV2.prototype.gengerateCalHtml = function() {
        this.calenderHTML = '';
        this.monthArray = [];
        var m = -1;
        var len = this.dateArray.length - 1;
        for (var i = 0; i <= len; i++) {
            var day = this.dateArray[i];
            var cc = this.setYmd(day.y,day.m,day.d,false);
            if (m == -1) m = day.m;
            if (m != day.m) {
                this.calenderHTML += this.genMonth();
                this.monthArray = [];
                m = day.m;
            }
            this.monthArray.push(day);
        };
        return(this);
    };

    calendarV2.prototype.genDate = function(day,i,j) {
        var writeDay = this.setYmd(day.y,day.m,day.d,false);
        var old = '';
        var unselectable = '';
        var checkDay = '';
        var isToday = this.getYmd(writeDay) == this.getYmd(this.today) ? 1 : 0;
        var attributeStr = '';
        if(writeDay < this.today) {
                var dayText = isToday && !this.isAbroad ? '今天' : day.d;
        } else {
            if(i.state == 'available') {
                var dayText = isToday && !this.isAbroad ? '今天<br/><span class="col_gray">&yen;'+i.houseprice+'</span>' : day.d+'<br/><span class="col_gray">&yen;'+i.houseprice+'</span>';
            } else {
                var dayText = isToday && !this.isAbroad ? '今天<br/><span class="col_gray">已租</span>' : day.d+'<br/><span class="col_gray">已租</span>';
            }
        }
        if (writeDay < this.today) old = this.classDayPass;
        if (writeDay>=this.today && writeDay < this.checkIn && this.checkOut == null) unselectable = this.classDayUnSelectAble;
        if ((this.checkIn && writeDay <= this.checkOut && writeDay > this.checkIn) ||
                (this.checkOut && this.getYmd(writeDay) == this.getYmd(this.checkOut)) ||
                (this.checkIn && this.getYmd(writeDay) == this.getYmd(this.checkIn))
           ){
               checkDay = this.classDaySelect;
               dayText = dayText.replace(/gray/,'');
        }
        if (this.checkIn && this.getYmd(writeDay) == this.getYmd(this.checkIn)){
            if(i.state == 'available'){
               dayText = '入住<br><span>&yen;'+i.houseprice+'</span>';
            } else {
               dayText = '入住<br><span>已租</span>';
            }
        }
        if(this.checkOut && this.getYmd(writeDay) == this.getYmd(this.checkOut)){
            if(i.state == 'available'){
                dayText = '离开<br><span>&yen;'+i.houseprice+'</span>';
            } else {
                dayText = '离开<br><span>已租</span>';
            }
        }
        if(old) {
            var li_classes = [this.classDayBase, old, checkDay];
        }
        else if(unselectable) {
            var li_classes = [this.classDayBase, unselectable];
        }else if(writeDay >= this.checkIn && writeDay <= this.checkOut){
            var li_classes = [this.classDayBase, this.classDayShow, checkDay];
        }
        else if(i.state != 'available') {
            if(this.checkOut && this.getYmd(writeDay) == this.getYmd(this.checkOut)) {
                var li_classes = [this.classDayBase, checkDay];
            } else {
                var li_classes = [this.classDayBase, this.classDayHasRented];
            }
        }
        else if(i.pricetype != 'normal' && checkDay != this.classDaySelect) {
            var li_classes = [this.classDayBase, this.classDayShow, checkDay, this.classDaySpecial];

        }
        else {
            var li_classes = [this.classDayBase, this.classDayShow, checkDay];
        }

        if(this.checkIn && !this.checkOut) {
            if(this.getYmd(writeDay) > this.getYmd(this.checkIn) && !this.firstGray) {
                if(i.state != 'available') {
                    localStorage.setItem('firstRentedDay',this.getYmd(writeDay));
                    this.firstGray = true;
                } else if(localStorage.getItem('firstHasRentedDay')) {
                    localStorage.setItem('firstRentedDay',localStorage.getItem('firstHasRentedDay'));
                    this.firstGray = true;
                }
            }
            var firstRentedDay = localStorage.getItem('firstRentedDay');
            if(this.firstGray) {
                if(firstRentedDay && this.getYmd(writeDay) > firstRentedDay) {
                    var li_classes = [this.classDayBase, this.classDayHasRented];
                }
                if(firstRentedDay && this.getYmd(writeDay) == firstRentedDay) {
                    var li_classes = [this.classDayBase, this.classDayShow];
                    dayText = day.d+'<br/><span class="col_gray">可退</span>';
                    attributeStr += ' checkoutable="1" ';
                }
            }
        }

        if(i.pricetype != 'normal'){
            attributeStr += ' isspecial="1" ';
        }

        if(j == 6) {
            if(i.state == 'available') {
                var li_html =  '<td class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'" available="1" '+attributeStr+'><span>'+ dayText +'</span></td></tr>';
            } else {
                var li_html =  '<td onclick="return false;" class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'"'+attributeStr+'><span>'+ dayText +'</span></td></tr>';
            }
        } else if(j == 0) {
            if(i.state == 'available') {
                var li_html =  '<tr><td class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'" available="1" '+attributeStr+'><span>'+ dayText +'</span></td>';
            } else {
                var li_html =  '<tr><td onclick="return false;" class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'"'+attributeStr+'><span>'+ dayText +'</span></td>';
            }
        } else {
            if(i.state == 'available') {
                var li_html =  '<td class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'"available="1" '+attributeStr+'><span>'+ dayText +'</span></td>';
            } else {
                var li_html =  '<td  class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" price="'+i.houseprice+'"'+attributeStr+'><span>'+ dayText +'</span></td>';
            }
        }

        var new_html = '';
        if ( this.fillDayInfo) new_html = this.fillDayInfo(li_html);
        return new_html == '' ? li_html : new_html;
    };

    calendarV2.prototype.genMonth = function() {
        var that = this;
        var dayHtml = '';
        var len = this.monthArray.length - 1;
        var calendarDay = this.monthArray[len];
        var luid = $('#lodgeUnitId').val();
        if(calendarDay.m <= 7) {
            var startDate = calendarDay.y + '-0' + (calendarDay.m + 1) + '-01';
            var endDate = calendarDay.y + '-0' + (calendarDay.m + 2) + '-01';
        }else if(calendarDay.m == 8){
            var startDate = calendarDay.y + '-0' + (calendarDay.m + 1) + '-01';
            var endDate = calendarDay.y + '-' + (calendarDay.m + 2) + '-01';
        } else if(calendarDay.m == 11){
            var startDate = calendarDay.y + '-' + (calendarDay.m + 1) + '-01';
            var endDate = (calendarDay.y+1) + '-01-01';
        } else {
            var startDate = calendarDay.y + '-' + (calendarDay.m + 1) + '-01';
            var endDate = calendarDay.y + '-' + (calendarDay.m + 2) + '-01';
        }

        var storageData = localStorage.getItem("dayData"+this.monthArray[0].y+this.monthArray[0].w+this.monthArray[0].m+this.monthArray[0].d);
        if(storageData) {
            var data = storageData;
        } else {
            var editable = true;
            var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();
            if(!calendarCode){
                return false;
            }
            // 防止日历爬虫 滑动验证请求两次验证
            if ($('body').find('.xz_model_private').length && $('.xz_model_private').css('display') === 'block') {
               return;
            }
            var url = XZWebUrlWriter.getAJAX_GetLodgeUnitCalendar(luid,startDate,endDate,editable,calendarCode);
            var data = XZWebUrlWriter.getRequestSpider('calendar',false,url,'json', function () {
                setTimeout(function () {
                    $('#startenddate').click();
                }, 1000)
            });
            if (!data) {
              return;
            }
            if('status' in data){
                if(data.status == 'error_calendarCode_wrong'){
                    LodgeUnitCalendarImageCodeValidator.removeCalendarCode();
                    return false;
                } else {
                    alert(data.statusInfo);
                    return false;
                }
            } else {

            }
            //localStorage.setItem("dayData"+this.monthArray[0].y+this.monthArray[0].w+this.monthArray[0].m+this.monthArray[0].d,data);
        }

        for (var i = 0; i <= len ; i++) {
            var day = this.monthArray[i];
            if (i==0) {
                dayHtml+=this.genEmptyDay(day.w);
            }
            var dayHtml = dayHtml + this.genDate(day,data[i],day.w);
        };
        dayHtml+=this.genEmptyDay(6 - day.w);

        var preHtml =
            '<div class="'+this.classMonth+'">'+
            '<div class="'+this.classTitle+'">'+
            '<span cury="'+day.y+'" curm="'+(day.m + 1)+'">'+day.y+'-'+(day.m + 1)+'</span>'+
            '</div>'+
            '<div class="pl5">'+
            '<table  border="0" cellspacing="2" cellpadding="0" class="'+this.classTable+'">'+
            '<thead>'+
            '<tr>'+
            '<th class="pink">日</th>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th class="pink">六</th>' +
            '</tr>'+
            '</thead>'+
            '<thead>';
        var afterHtml = '</thead></table></div></div>';
        //return preHtml + afterHtml;
        return preHtml + '<tr class="'+this.classDay+'">'+dayHtml + afterHtml;
    };

    calendarV2.prototype.genEmptyDay = function(num) {
        var emptyday = '';
        for (var i = 1; i<= num; i++) {
            emptyday+='<td class="'+this.classDayPass+' '+this.classDayBase+'"></td>';
        }
        return emptyday;
    };

    calendarV2.prototype.fillCalender = function() {
        //this.e.html(this.prependHtml + this.calenderHTML + this.clearDateHTML() + this.preMonthHTML() + this.nextMonthHTML());
        var nationHtml = '';
        if(this.isAbroad){
            var nationHtml = '<div class="calendar_time">以'+$('#cityName').val()+'时间为准</div>';
        }
        this.e.html(this.prependHtml + this.calenderHTML +'<div class="day">特价日</div>'+ this.preMonthHTML() + this.nextMonthHTML() + nationHtml);
        //this.e.find('.' + this.classMonth).first().addClass('paddingR10');
        this.e.find('.' + this.classMonth).first().next().removeClass('calendar_l').addClass('calendar_r');
        //this.e.find('.' + this.classMonth).first().children('.' + this.classTitle).addClass('width_274');
        return(this);
    };
    calendarV2.prototype.clearSelect = function() {
        var _this = this;
        this.e.find('.checkedday,' + '.' + this.classDaySelect).each(function(){
            var price = $(this).attr('price');
            if ($(this).attr('today') == '1') {
                if($(this).attr('available') == '1'){
                    $(this).find('span').html('今天<br/><span class="col_gray">&yen;'+price+'<span>');
                } else {
                    $(this).find('span').html('今天<br/><span class="col_gray">已租<span>').end().addClass(_this.classDayHasRented);
                }
            } else {
                if($(this).attr('available') == '1'){
                    $(this).find('span').html($(this).attr('d')+'<br/><span class="col_gray">&yen;'+price+'</span>');
                } else {
                    $(this).find('span').html($(this).attr('d')+'<br/><span class="col_gray">已租</span>').end().addClass(_this.classDayHasRented);
                }
            }
            if($(this).attr('isspecial') == '1'){
                $(this).addClass(_this.classDaySpecial);
            }

            if (_this.fillDayInfo) _this.fillDayInfo($(this));
        })
        .removeClass('checkedday');
        this.e.find('.' + this.classDaySelect).removeClass(this.classDaySelect);
        //this.e.find('.' + this.classDayUnSelectAble+':first').addClass(this.classDayShow).removeClass(this.classDayUnSelectAble);
        $("#clearSelect").removeClass(_this.classPink);
        if(this.checkIn && this.checkOut) {
            this.e.hide();
        }
        this.checkOut = null;
        this.checkIn  = null;
        //this.firstGray = false;
        return(this);
    };

    calendarV2.prototype.bindEvent = function() {
        var _this = this;

        this.e.find('.' + this.classDayBase).on('click', function(){
            //$(this).parent().prevAll('tr').each(function(){
            //    $(this).children('td').addClass(_this.classDayHasRented);
            //});
            this.firstGray = false;
            localStorage.setItem('firstHasRentedDay','');
            if ($(this).hasClass(_this.classDayPass) || $(this).hasClass(_this.classDayUnSelectAble) || ($(this).attr('available') != '1' && $(this).attr('checkoutable') != '1')) return false;
            if ($(this).hasClass('cal_noRoom')) return false;
            if ($(this).hasClass(_this.classDaySelect) && $('.checkedday').index(this) == 0) {
                var curClickTd = $(this);
                if(curClickTd.closest('.calendar_r').length){
                    if(curClickTd.attr('m') == '0'){
                        var initAtWhen =  _this.setYmd(curClickTd.attr('y')-1,11,1);
                    } else {
                        var initAtWhen =  _this.setYmd(curClickTd.attr('y'),curClickTd.attr('m')-1,1);
                    }
                } else {
                    var initAtWhen =  _this.setYmd(curClickTd.attr('y'),curClickTd.attr('m'),1);
                }
                _this.checkIn = null;
                _this.checkOut = null;
                $('#startdate').val('');
                $('#enddate').val('');
                _this.init(initAtWhen);
                $('#startenddate').val('选择入住日期');
                $('#startenddate').click();
                return false;
            }
            if ($(this).hasClass(_this.classDayHasRented)) return false;
            //if ($(this).hasClass(_this.classDaySpecial)) $(this).removeClass(_this.classDaySpecial);
            var thisday = $(this).find('span');
            if (!_this.checkIn && !_this.checkOut) {
                $('.checkedday').removeClass('checkedday');
                $(this).addClass('checkedday').removeClass(_this.classDaySpecial);
            } else if (_this.checkIn && !_this.checkOut) {
                $(this).addClass('checkedday');
            } else if (_this.checkIn && _this.checkOut) {
                _this.clearSelect();
                _this.e.show();
                $(this).addClass('checkedday').removeClass(_this.classDaySpecial);
            } else if (!_this.checkIn && _this.checkOut) {
                _this.clearSelect();
            }
            $(this).toggleClass(_this.classDaySelect);
            _this.refreshCheckState();
            /*
            if ($(this).parent().parent().parent().parent().parent().hasClass('calendar_r')) {
                _this.nextMonth();
            }*/
        })
//        this.e.find('.' + this.classDayBase).hover(function() {
//            var ymd = $(this).attr('ymd');
//            if(_this.checkIn && _this.checkOut && ymd >= _this.getYmd(_this.checkIn) && ymd <= _this.getYmd(_this.checkOut)) {
//            } else {
//                if(!$(this).hasClass(_this.classDayHasRented)) {
//                    $(this).addClass(_this.classDaySelect);
//                }
//            }
//            if(!$(this).hasClass(_this.classDayHasRented)) {
//                $(this).addClass('hz');
//            }
//        },function() {
//            var ymd = $(this).attr('ymd');
//            if(_this.checkIn && _this.checkOut &&  ymd >= _this.getYmd(_this.checkIn) && ymd <= _this.getYmd(_this.checkOut)) {
//            } else {
//                if(!$(this).hasClass('checkedday')) {
//                    $(this).removeClass(_this.classDaySelect);
//                }
//            }
//            $(this).removeClass('hz');
//        })
        return(this);
    };
    calendarV2.prototype.refreshCheckState = function() {
        _this = this;
        var checkedday = this.e.find('.checkedday');
        var checkLast = checkedday.last();
        checkLast.find('span').html('离开');

        if(!_this.checkIn) {
            var checkFirst = checkedday.first();
            var price = checkFirst.attr('price');
            checkFirst.find('span').html('入住<br/><span>&yen;'+price+'</span>');
            checkFirst.prevAll('td').removeClass(_this.classDaySpecial).addClass(_this.classDayHasRented);
            if(checkFirst.closest('.calendar_r').length){
                this.e.find('.calendar_l td.show-date').removeClass(this.classDaySpecial).addClass(this.classDayHasRented);
            }
            checkFirst.parent().prevAll('tr').each(function() {
                $(this).children('td').each(function() {
                    if($(this).children().length) {
                        $(this).removeClass(_this.classDaySpecial).addClass(_this.classDayHasRented);
                    }
                })
            })
            var enterday = checkFirst.attr('ymd');
            var firstHasRented = false;
            var firstHasRentedDay = '';
            _this.e.find('.' + _this.classDayBase).each(function() {
                if($(this).attr('ymd') && $(this).attr('ymd') > enterday && ($(this).hasClass(_this.classDayHasRented) || $(this).attr('ymd') == $('#detailBookArea').attr('firstHasRentedDay'))) {
                    $(this).removeClass(_this.classDayHasRented).addClass(_this.classDayShow).attr('checkoutable',1).find('span span').text('可退');
                    firstHasRentedDay = $(this).attr('ymd');
                    localStorage.setItem('firstHasRentedDay',firstHasRentedDay);
                    $('#detailBookArea').attr('firstHasRentedDay',firstHasRentedDay);
                    firstHasRented = true;
                    return false;
                }
            })
            if(firstHasRented) {
                _this.e.find('.' + _this.classDayBase).each(function() {
                    if($(this).attr('ymd') && $(this).attr('ymd') > firstHasRentedDay) {
                        $(this).addClass(_this.classDayHasRented).removeClass(_this.classDaySpecial);
                    }
                })
            }
        }
        if (_this.fillDayInfo) {
            this.fillDayInfo(checkLast);
            if(!_this.checkIn) {
                this.fillDayInfo(checkFirst);
            }
        }
        var leaveday = checkLast.attr('ymd');
        this.doColor = leaveday == enterday ? false : true;

        doColorState = false;

        if (!_this.checkIn && checkFirst.length) {
            this.checkIn = this.setYmd(checkFirst.attr('y'),checkFirst.attr('m'),checkFirst.attr('d'));
        }
        if(leaveday != enterday) {
            this.checkOut = this.setYmd(checkLast.attr('y'),checkLast.attr('m'),checkLast.attr('d'));
        }
        if(this.checkIn && this.checkOut && (this.getYmd(this.checkIn) == this.getYmd(this.checkOut))) {
            var initAtWhen = _this.checkIn;
            _this.checkIn = null;
            _this.checkOut = null;
            $('#startdate').val('');
            $('#enddate').val('');
            _this.init(initAtWhen);
            $('#startenddate').val('选择入住日期');
            setTimeout(function() {
                $('#startenddate').click();
            },100);
            return false;
        }
        /*
        this.e.find('.' + this.classDayBase).not('.old').not('span').each(function(){
            var liYmd = $(this).attr('ymd');
            liYmd = new Date(liYmd.replace(/-/g, "/"));
            if (_this.doColor) {
                if(!_this.checkIn) {
                    if ($(this).hasClass(_this.classDaySelect)) doColorState = !doColorState;
                    if (doColorState){
                        $(this).addClass(_this.classDaySelect);
                        $(this).addClass('checkedday');
                        if (_this.getDayInfo) _this.getDayInfo($(this));
                    }
                }
                else {
                    if( (_this.getYmd(liYmd) >= _this.getYmd(_this.checkIn))  && ( _this.getYmd(liYmd) <= _this.getYmd(_this.checkOut)) ) {
                        $(this).addClass(_this.classDaySelect);
                        $(this).addClass('checkedday');
                        if (_this.getDayInfo) _this.getDayInfo($(this));
                    }
                }
            }
            if(_this.getYmd(liYmd) < _this.getYmd(_this.checkIn) ) {
                $(this).addClass(_this.classDayUnSelectAble);
                $(this).removeClass(_this.classDayShow);
            }
            if (_this.fillDayInfo) _this.fillDayInfo($(this));
        })
        */
        this.checkDayChange();
        return(this);
    };
    calendarV2.prototype.resetBeforeCheckInState = function() {
        //this.e.find('.' + this.classDayUnSelectAble).addClass(this.classDayShow).removeClass(this.classDayUnSelectAble);
    };
    calendarV2.prototype.clearDateHTML = function() {

        if(this.checkIn){
            var clearHtml = '<span class="empty ' + this.classPink + '" id="clearSelect">清空日期 </span>';
        }
        else {
            var clearHtml = '<div class="empty" id="clearSelect">清空日期 </div>';
        }
        return clearHtml;
    };
    calendarV2.prototype.preMonthHTML = function() {
        if((this.today.getMonth() == this.firstDate.m) && (this.today.getFullYear() == this.firstDate.y)) {
            return '';
        }
        else {
            var preMonth = '<span class="cal_pre" id="preMonth"></span>';
            return preMonth;
        }
    };
    calendarV2.prototype.nextMonthHTML = function() {
        var nextMonth = '<span class="cal_next" id="nextMonth"></span>';
        return nextMonth;
    }
    calendarV2.prototype.renderRefundRule = function() {
        var lodgeUnitCreateType = $("#lodgeUnitCreateType").val();
        if(lodgeUnitCreateType == 'spider'){
            this.renderSpiderLodgeUnitRefundRule();
        } else {
            this.renderPublishLodgeUnitRefundRule();
        }
        return (this);
    };
    calendarV2.prototype.renderPublishLodgeUnitRefundRule = function(){
        var rule_a = $('#rule_A').val() || 0;
        var rule_n = $('#rule_N').val() || 0;
        var getIfOversea = $('#getIfOversea').val();
        var city_name = getIfOversea == '1' ?  $('#cityName').val()+'时间':'';
        var timeZone = 0;
        if(this.checkIn && this.checkOut){
            var checkInTime  = (this.checkIn.getMonth()+1)+'.'+this.checkIn.getDate();
            var checkOutTime = (this.checkOut.getMonth()+1)+'.'+this.checkOut.getDate();
            var now          = new Date();
            var cancelAllDayTime =  this.checkIn.valueOf() - rule_n * 24 * 60 * 60 * 1000;
            var cancelAllDay = new Date(cancelAllDayTime);
            var cancelAllDayDate = (cancelAllDay.getMonth()+1)+'.'+cancelAllDay.getDate();
            var newCheckInDate  = (cancelAllDay.getMonth()+1)+'月'+cancelAllDay.getDate()+'日';
            $('#pos_n_1').text((now.getMonth()+1)+'.'+now.getDate());
            $('#pos_n_2').text(cancelAllDayDate+' 14:00前');
            $('#pos_n_3').text((this.checkIn.getMonth()+1)+'.'+this.checkIn.getDate()+' 14:00前');
            $('#pos_n_4').text((this.checkOut.getMonth()+1)+'.'+this.checkOut.getDate()+' 12:00前');
            if(cancelAllDayTime <= now.valueOf()){
                $('#pos_n_1').text('预订成功');
            }
            iDays  =  parseInt(Math.abs(this.checkIn  -  this.checkOut)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
            nDays  =  parseInt(Math.abs(this.checkIn  -  cancelAllDay)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
            if(rule_a<iDays){
                var  newCheckOut = this.checkIn.valueOf();
                newCheckOut = newCheckOut + rule_a * 24 * 60 * 60 * 1000;
                newCheckOut = new Date(newCheckOut);
                checkOutTime = (newCheckOut.getMonth()+1)+'.'+newCheckOut.getDate();
            }
            var current_rule_a = rule_a > iDays ? iDays: rule_a;
            if(cancelAllDay > now.valueOf()){
                $('.new_pos_notice .new_pos_n2').html(city_name+newCheckInDate);
                $('.new_pos_notice .new_pos_n3').html(current_rule_a);
                $('.new_pos_notice').text('根据房东设置的交易规则未早于'+city_name+newCheckInDate+ '退订视为有责取消，应扣除取消订单时间点后'+current_rule_a+'天订金作为违约金，剩余钱款将被原路退还');
            }else {
                $('.new_pos_notice').text('根据房东设置的交易规则您将不能享受无责取消权益。若退订将被扣除取消订单时间点后'+current_rule_a+'天订金作为违约金，剩余钱款将被原路退还');
            }
            $('.pos_3').text('如提前退房，扣除之后'+current_rule_a+'天的订金。');
            $('.pos_2').text('如取消订单，扣除'+checkInTime+'-'+checkOutTime+'的订金');
        }else if(!this.checkIn && !this.checkOut){
            $('.pos_2').text('如取消订单，扣除前'+rule_a+'天的订金');
            $('#pos_n_1').text('预订成功');
            $('#pos_n_2').text('入住前'+rule_n+'天14:00前');
            $('#pos_n_3').text('入住当天14:00前');
            $('#pos_n_4').text('退房当天12:00前');
        }else{
        }

    }
    calendarV2.prototype.renderSpiderLodgeUnitRefundRule = function(){
        var rule_n = parseInt($('#rule_N').val()) || 0;
        var nativeCity = $("#nativeCity").val();
        var timeZone = 0;
        var spiderLodgeUnitCancelRule = '';
        if(this.checkIn && this.checkOut){
            var checkInTime  = this.checkIn.getFullYear()+'.'+(this.checkIn.getMonth()+1)+'.'+this.checkIn.getDate();
            var cancelLimitTime =  this.checkIn.valueOf() - rule_n * 24 * 60 * 60 * 1000;
            var cancelLimitDay = new Date(cancelLimitTime);
            var cancelLimitDayDate = cancelLimitDay.getFullYear()+'.'+(cancelLimitDay.getMonth()+1)+'.'+cancelLimitDay.getDate();
            switch(rule_n){
               case 1:
                   spiderLodgeUnitCancelRule = "入住前1天取消预订可获得全额退款</br>";
                   spiderLodgeUnitCancelRule += "要获得全额住宿费用退款，房客必须在"+cancelLimitDayDate+" 15：00（"+nativeCity+"当地时间）之前取消预订。</br>";
                   spiderLodgeUnitCancelRule += "如果房客在"+cancelLimitDayDate+" 15：00 - "+checkInTime+" 15：00 取消预订，首晚房费将不可退还。</br>";
                   spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，那么正式取消预订24小时后的未住宿天数的住宿费用将全额退款。";
                   break;
                case 5:
                    spiderLodgeUnitCancelRule = "入住前5天取消预订可获得全额退款</br>";
                    spiderLodgeUnitCancelRule += "要获得住宿费用的全额退款，房客必须在"+cancelLimitDayDate+" 15：00（"+nativeCity+"当地时间）之前取消预订。</br>";
                    spiderLodgeUnitCancelRule += "如果房客"+cancelLimitDayDate+" 15：00 - "+checkInTime+" 15：00 退订，那么首晚房费将不可退还，但剩余的天数将退还50%的房费。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，那么退订发生24小时后未住宿的天数将退还50%的房费。";
                    break;
                case 7:
                    spiderLodgeUnitCancelRule = "入住前1周取消预订可获得50%退款（服务费除外)</br>";
                    spiderLodgeUnitCancelRule += "要获得50%的住宿费用退款，房客必须在"+cancelLimitDayDate+" 15：00（"+nativeCity+"当地时间）之前取消预订，否则不予退款。</br>";
                    spiderLodgeUnitCancelRule += "如果房客未能在"+cancelLimitDayDate+" 15：00前取消预订，未住宿天数的房费将不予退还。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，剩余天数的房费将不予退还。";
                    break;
                case 30:
                    spiderLodgeUnitCancelRule = "入住前30天取消预订可获得50%退款</br>";
                    spiderLodgeUnitCancelRule += "要获得50%的住宿费用退款，房客必须在"+cancelLimitDayDate+" 15：00（"+nativeCity+"当地时间）之前取消预订。</br>";
                    spiderLodgeUnitCancelRule += "如果房客未能在"+cancelLimitDayDate+" 15：00前取消预订，未住宿天数的房费将不予退还。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前离开，剩余天数不予退款。"
                    break;
                default:
                    break;
            }
            $('#spiderLodgeUnitCancelRule').html(spiderLodgeUnitCancelRule);
        }else if(!this.checkIn && !this.checkOut){
            switch(rule_n){
               case 1:
                   spiderLodgeUnitCancelRule = "入住前1天取消预订可获得全额退款</br>";
                   spiderLodgeUnitCancelRule += "要获得全额住宿费用退款，房客必须在入住日期当天的入住时间（"+nativeCity+"当地时间；若未特别注明，则以下午3点为准）前24小时取消预订。</br>";
                   spiderLodgeUnitCancelRule += "如果房客在入住前不到24小时取消预订，首晚房费将不可退还。</br>";
                   spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，那么正式取消预订24小时后的未住宿天数的住宿费用将全额退款。";
                   break;
                case 5:
                    spiderLodgeUnitCancelRule = "入住前5天取消预订可获得全额退款</br>";
                    spiderLodgeUnitCancelRule += "要获得住宿费用的全额退款，房客必须在入住日期（"+nativeCity+"当地时间；若未特别注明，则以下午3点为准）前5天整取消预订。</br>";
                    spiderLodgeUnitCancelRule += "如果房客提前不到5天退订，那么首晚房费将不可退还，但剩余的天数将退还50%的房费。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，那么退订发生24小时后未住宿的天数将退还50%的房费。";
                    break;
                case 7:
                    spiderLodgeUnitCancelRule = "入住前1周取消预订可获得50%退款（服务费除外)</br>";
                    spiderLodgeUnitCancelRule += "要获得50%的住宿费用退款，房客必须在入住日期（"+nativeCity+"当地时间；若未特别注明，则以下午3点为准）前7天整取消预订，否则不予退款。</br>";
                    spiderLodgeUnitCancelRule += "如果房客未能在7天前取消预订，未住宿天数的房费将不予退还。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前退房，剩余天数的房费将不予退还。";
                    break;
                case 30:
                    spiderLodgeUnitCancelRule = "入住前30天取消预订可获得50%退款</br>";
                    spiderLodgeUnitCancelRule += "要获得50%的住宿费用退款，房客必须在入住日期（"+nativeCity+"当地时间；若未特别注明，则以下午3点为准）前30天整取消预订。</br>";
                    spiderLodgeUnitCancelRule += "如果房客未能在30天前取消预订，未住宿天数的房费将不予退还。</br>";
                    spiderLodgeUnitCancelRule += "如果房客已入住但决定提前离开，剩余天数不予退款。";
                    break;
                default:
                    break;
            }
            $('#spiderLodgeUnitCancelRule').html(spiderLodgeUnitCancelRule);
        }else{
        }
    }
}
catch(e){console.log(e);}


var defaultText = '入住离开日期';
var defaultStartText = '选择入住日期';
var defaultEndText = '选择离开日期';
try{
    var execCalendar = function(input,option){
        var inputObj = $(input);
        var autoSearch = option.autoSearch || null;
        var showPrice = option.showPrice || null;
        var calendarBox = option.calendar || '#calendarBox';
        var classTitle = option.classTitle || null;
        var classTable = option.classTable || null;
        var calendar = new calendarV2(calendarBox, {
            classTitle:classTitle,
            classTable:classTable,
            checkDayChange:function(){
                if(this.checkIn){
                    var startMonth = (this.checkIn.getMonth() < 9) ? '0'+ (this.checkIn.getMonth()+1) : (this.checkIn.getMonth()+1);
                    var startDate = (this.checkIn.getDate() < 10) ? '0'+ (this.checkIn.getDate()) : this.checkIn.getDate();
                    $('#startdate').val(this.checkIn.getFullYear() + '-' + startMonth + '-' + startDate);
                    $('#enddate').val('');
                    inputObj.val(defaultEndText);
                }
                if(this.checkOut){
                    var dateNum = dateDiff('d',this.checkIn,this.checkOut);
                    var _this = this;
                    if(dateNum < this.minDay || (this.maxDay && dateNum > this.maxDay)){
                        if(dateNum < this.minDay){
                            var tipText =  '最少入住天数为'+this.minDay+'天';
                        } else {
                            var tipText = '最多入住天数为'+this.maxDay+'天';
                        }
                        $('#startenddate').val(tipText);
                        this.checkOut = null;
                        var checkOutTd = this.e.find('td.checkedday').last();
                        if(checkOutTd.attr('available') == '1'){
                            checkOutTd.find('span').html(checkOutTd.attr('d')+'<br/><span class="col_gray">&yen;'+checkOutTd.attr('price')+'</span>')
                            .removeClass(_this.classDaySelect);
                        } else {
                            if(checkOutTd.attr('checkoutable') == '1'){
                                checkOutTd.find('span').html(checkOutTd.attr('d')+'<br/><span class="col_gray">可退</span>');
                            } else {
                                checkOutTd.find('span').html(checkOutTd.attr('d')+'<br/><span class="col_gray">已租</span>').end().addClass(_this.classDayHasRented);
                            }

                        }
                        checkOutTd.removeClass(_this.classDaySelect+' checkedday');
                        $('#enddate').val('');
                        this.renderRefundRule();
                        setTimeout(function() {
                            $('#startenddate').click();
                            $('#startenddate').val(tipText);
                            $("#startenddate").fadeOut(200).fadeIn(200);
                            $("#startenddate").fadeOut(200).fadeIn(200);
                            $("#startenddate").fadeOut(200).fadeIn(200);
                        },50);
                        return false;
                    }
                    var endMonth = (this.checkOut.getMonth() < 9) ? '0'+ (this.checkOut.getMonth()+1) : (this.checkOut.getMonth()+1);
                    var endDate = (this.checkOut.getDate() < 10) ? '0'+ (this.checkOut.getDate()) : this.checkOut.getDate();
                    $('#enddate').val(this.checkOut.getFullYear() + '-' + endMonth + '-' + endDate).trigger('change');
                    inputObj.val(this.checkIn.getFullYear() + '-' + (this.checkIn.getMonth()+1) + '-' + this.checkIn.getDate() + '至' + this.checkOut.getFullYear() + '-' + ( this.checkOut.getMonth()+1) + '-' + this.checkOut.getDate());
                    this.e.hide();
                    $('.icon_removetime').show();
                    if(autoSearch) {
                        calTotalPrice();
                    }
                }
                scrollPage($(calendarBox));
                this.renderRefundRule();
            },
            checkIn: $('#startdate').val() ? new Date($('#startdate').val().replace(/-/g, "/")) : null,
            checkOut: $('#enddate').val() ? new Date($('#enddate').val().replace(/-/g, "/")) : null,
            isAbroad : $('#isAbroad').val() == 1 ? true : false
        })
        $(calendarBox).unbind('click');
        $(calendarBox).on('click','#clearSelect',function(){ //            calendar.clearSelect();
            $('#startdate').val('');
            $('#enddate').val('');
            $('#startenddate').val('入住离开时间');
            if(autoSearch) {
                deleteCookie('startDate','/','.'+topLevelDomain);
                deleteCookie('endDate','/','.'+topLevelDomain);
                calTotalPrice();
                return false;
            }
            if($(calendarBox).is(':visible')) {
                inputObj.val(defaultStartText);
            }
            else {
                inputObj.val(defaultText);
            }
        })
        $(calendarBox).on('click','#preMonth',function(){
            calendar.preMonth();
            scrollPage($(calendarBox));
        })
        $(calendarBox).on('click','#nextMonth',function(){
            calendar.nextMonth();
            scrollPage($(calendarBox));
        })
        // inputObj.bind('click focus',function(){
        //     if($('#startdate').val() == '' && $('#enddate').val() == ''){
        //         inputObj.val(defaultStartText);
        //     }
        //     if($('#startdate').val() != '' && $('#enddate').val() != ''){
        //         calendar.resetBeforeCheckInState();
        //     }
        //     calendar.e.show();
        //     scrollPage($(calendarBox));
        // })
        inputObj.bind('blur',function(){
            //calendar.e.hide();
        })
    }
    $('#calendar_btn_s').click(function(){
        $("#startenddate").click();
    })
}
catch(e){}

 
 window.DetailLightBox = {
    //{{{
    init : function(curPhotoIndex)
    {
        //{{{
        var that = this;
        this.curPhotoIndex = curPhotoIndex;
        this.curBigPhoto = $('#curBigPhoto');
        this.prevBtn = $('.detail-photo-prev');
        this.nextBtn = $('.detail-photo-next');
        this.thumbNav = $('#lightBoxDialog .thumb-photo-nav li');
        this.curBigPhoto.rotateValue = 0;
        this.thumbNav.find('img').click(function(){
            that.thumbNavClick.call(that,$(this));
        });
        $('#lightBoxDialog .rota_l').unbind('click').click(function(){
            that.curBigPhoto.rotateValue -= 90;
            that.rotateImg();
        });
        $('#lightBoxDialog .rota_r').unbind('click').click(function(){
            that.curBigPhoto.rotateValue += 90;
            that.rotateImg();
        });
        this.prevBtn.unbind('click').click(function(){
            that.prevPhoto.call(that);
        });
        this.nextBtn.unbind('click').click(function(){
            that.nextPhoto.call(that); 
        });
        $('#close_photo_box').click(function(e){
            e.preventDefault();
            $('#lightBoxDialog').hide(); 
            $('body').css('overflow','visible');
        });
        DetailLightBox.checkScreenWidth();
        this.preLoadImg();
        //}}}
    },
    initComment : function(curPhotoIndex,imageId)
    {
        //{{{
        var that = this;
        this.curPhotoIndex = curPhotoIndex;
        this.curBigPhoto = $('#curBigPhoto');
        this.prevBtn = $('.detail-photo-prev');
        this.nextBtn = $('.detail-photo-next');
        this.thumbNav = $('#lightBoxDialog .thumb-photo-nav li');
        this.imgWidth = 800;
        this.imgHeight = 500;
        this.curBigPhoto.rotateValue = 0;
        that.rotateImg();
        this.curBigPhoto.closest('.pr').css({'width':this.imgWidth,'height':this.imgHeight});
        this.thumbNav.find('img').click(function(){
            var imageThumbNav = $(this).parent().parent().attr('id');
            imageThumbNav = imageThumbNav.substr(11);
            $('#curBigPhotoId').val(imageThumbNav);
            that.thumbNavClick.call(that,$(this));
        });
        $('#curBigPhotoId').val(imageId);
        $('#lightBoxDialog .rota_l').unbind('click').click(function(){
            that.curBigPhoto.rotateValue -= 90;
            var curBigPhotoId = $('#curBigPhotoId').val();
            $('#degrees'+curBigPhotoId).val(that.curBigPhoto.rotateValue);
            that.rotateImg();
            rotateImg(that.curBigPhoto.rotateValue,curBigPhotoId);            
        });
        $('#lightBoxDialog .rota_r').unbind('click').click(function(){
            that.curBigPhoto.rotateValue += 90;
            var curBigPhotoId = $('#curBigPhotoId').val();
            $('#degrees'+curBigPhotoId).val(that.curBigPhoto.rotateValue);
            that.rotateImg();
            rotateImg(that.curBigPhoto.rotateValue,curBigPhotoId); 
        });
        
        $('#lightBoxDialog .photo_delete').unbind('click').click(function(){
            var delBigSuolv = $('#curBigPhotoId').val();
            var curPhotoIndexNext  = that.curPhotoIndex+1;
            curPhotoIndexNext = curPhotoIndexNext > that.thumbNav.length-1 ? 0 : curPhotoIndexNext;
            var imageThumbNav = that.thumbNav.eq(curPhotoIndexNext).attr('id');
            imageThumbNav = imageThumbNav.substr(11);
            $('#curBigPhotoId').val(imageThumbNav);
            removeImage('Success_'+delBigSuolv+',0');
            that.nextPhoto.call(that);  
        });

        this.prevBtn.unbind('click').click(function(){
            var curPhotoIndexPrev  = that.curPhotoIndex-1;
            curPhotoIndexPrev = curPhotoIndexPrev < 0 ? that.thumbNav.length-1 : curPhotoIndexPrev;
            var imageThumbNav = that.thumbNav.eq(curPhotoIndexPrev).attr('id');
            imageThumbNav = imageThumbNav.substr(11);
            $('#curBigPhotoId').val(imageThumbNav);
            that.prevPhoto.call(that);
        });
        this.nextBtn.unbind('click').click(function(){
            var curPhotoIndexNext  = that.curPhotoIndex+1;
            curPhotoIndexNext = curPhotoIndexNext > that.thumbNav.length-1 ? 0 : curPhotoIndexNext;
            var imageThumbNav = that.thumbNav.eq(curPhotoIndexNext).attr('id');
            imageThumbNav = imageThumbNav.substr(11);
            $('#curBigPhotoId').val(imageThumbNav);
            that.nextPhoto.call(that); 
        });
        $('#close_photo_box').click(function(e){
            e.preventDefault();
            $('#lightBoxDialog').hide(); 
            $('body').css('overflow','visible');
        });
        this.preLoadImg();
        //}}}
    },
    updateThumbNav : function(){
        //{{{
        this.thumbNav.find('.cur').hide(); 
        this.thumbNav.eq(this.curPhotoIndex).find('.cur').show();
        //}}}
    },
    thumbNavClick : function(element){
        //{{{
        this.curPhotoIndex = this.thumbNav.index(element.closest('li'));  
        this.changePhoto();
        //}}}
    },
    prevPhoto : function(){
        //{{{
        this.curPhotoIndex --; 
        this.curPhotoIndex = this.curPhotoIndex < 0 ? this.thumbNav.length-1 : this.curPhotoIndex;
        this.changePhoto();
        //}}}
    },
    nextPhoto : function(){
        //{{{
        this.curPhotoIndex ++;
        this.curPhotoIndex = this.curPhotoIndex > this.thumbNav.length-1 ? 0 : this.curPhotoIndex;
        this.changePhoto();
        //}}}
    },
    changePhoto : function(){
        //{{{
        var that = this;
        var curNavPhoto = this.thumbNav.eq(this.curPhotoIndex).find('img');
        var curBigPhoto = this.curBigPhoto.get(0);
        curBigPhoto.onload = function(){
            var imgRate = curNavPhoto.attr('data-imgrate');
            if(imgRate <= 8/5){
                var imgHeight = that.imgHeight;
                var imgWidth = Math.floor(imgRate*imgHeight);
            } else {
                var imgWidth = that.imgWidth;
                var imgHeight = Math.floor(imgWidth/imgRate);
            }
            that.curBigPhoto.css({'width':imgWidth,'height':imgHeight,'marginTop':(that.imgHeight-imgHeight)/2,'marginLeft':(that.imgWidth-imgWidth)/2}).attr({'imgrate':imgRate,'oriwidth':curBigPhoto.width,'oriheight':curBigPhoto.height});
            curBigPhoto.onload = null;
        };
        this.updateThumbNav();
        this.curBigPhoto.attr('src',curNavPhoto.attr('data-bigimg'));
        this.curBigPhoto.rotateValue = 0;
        if($.browser.msie && $.browser.version-0<9){
            this.curBigPhoto.css('filter','progid:DXImageTransform.Microsoft.BasicImage(rotation=0)');
        }else{
            this.curBigPhoto.css('transform','rotate(0deg)');
        }
        //$('#currentIndexOfPic').html(this.curPhotoIndex+1);
        //$('#currentIntroOfPic').html(curNavPhoto.attr('data-intro'));
        //}}}
    },
    checkNavWidth : function(){
        //{{{
        if($('#small_pic_box_father .thumb-photo-nav').width() == 970){
            this.medimIndex = 4; 
            this.navShowLength = 10;
        } else {
            this.medimIndex = 6; 
            this.navShowLength = 14;
        }
        //}}}
    },
    showLightBox : function()
    {
        //{{{
        $('body').css('overflow','hidden');
        $('#lightBoxDialog').show(); 
        if(this.thumbNav.length <=1 ){
            $('.detail-photo-prev,.detail-photo-next,#small_pic_box_father').hide();
        } else {
            $('.detail-photo-prev,.detail-photo-next,#small_pic_box_father').show();
        }
        this.checkNavWidth();
        //}}}
    },
    checkScreenWidth : function(){
        //{{{
        if($('#detailImageBox').width() == 920){
            this.imgWidth = 800;
            this.imgHeight = 500; 
        } else {
            this.imgWidth = 665;
            this.imgHeight = 415;
        }
        this.curBigPhoto.closest('.pr').css({'width':this.imgWidth,'height':this.imgHeight});
        this.changePhoto();
        //}}}
    },
    rotateImg : function(){
        //{{{
        var rotateIE = this.curBigPhoto.rotateValue/90%4;
        rotateIE = rotateIE < 0 ? rotateIE+4 : rotateIE; 
        var imgRate = this.curBigPhoto.attr('imgrate')-0;
        var oriImgWidth = this.curBigPhoto.attr('oriwidth');
        var oriImgHeight = this.curBigPhoto.attr('oriheight');
        if(rotateIE == 0 ||  rotateIE == 2){
            if(imgRate <= 1){
                var imgHeight = Math.min(this.imgHeight,oriImgHeight);
                var imgWidth = Math.floor(imgRate*imgHeight);
            } else {
                var imgWidth = Math.min(this.imgWidth,oriImgWidth);
                var imgHeight = Math.floor(imgWidth/imgRate);
                var marginLeft = 0;
            }
            var marginLeft = (this.imgWidth-imgWidth)/2;
            var marginTop =  (this.imgHeight-imgHeight)/2;
        } else {
            if(imgRate <= 1){
                var imgHeight = Math.min(this.imgWidth,oriImgHeight);
                var imgWidth = Math.floor(imgRate*imgHeight);
            } else {
                var imgWidth = Math.min(this.imgHeight,oriImgWidth);
                var imgHeight = Math.floor(imgWidth/imgRate);
            }
            var marginLeft = (this.imgWidth-imgHeight)/2;
            var marginTop =  (this.imgHeight-imgWidth)/2;
        }
        if($.browser.msie && $.browser.version-0<9){ 
            this.curBigPhoto.css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+rotateIE+')'});
            this.curBigPhoto.css({'width':imgWidth,'height':imgHeight,'margin-left':marginLeft,'margin-top':marginTop});
        }else{
            this.curBigPhoto.css('transform','rotate('+this.curBigPhoto.rotateValue+'deg)');
            this.curBigPhoto.css({'width':imgWidth,'height':imgHeight,'margin-left':(this.imgWidth-imgWidth)/2,'margin-top':(this.imgHeight-imgHeight)/2});
        }
        //}}}
    },
    preLoadImg : function(){
        //{{{
        this.thumbNav.each(function(){
            var image = new Image(); 
            image.src = $(this).find('img').attr('data-bigimg'); 
        });
        //}}}
    }
    //}}}
}
$('.carefree_tip').mouseover(function () {
    $('#carefreeTip').show();
});
$('.carefree_tip').mouseleave(function () {
    $('#carefreeTip').hide();
});
 
 

var favoriteObj = {
    nameMaxLen : 16,
    descMaxLen : 200,
    returnMsg  : {rst:true,msg:''}
} 

favoriteObj.getByteLen = function (val) {
    return val.length;
    /*
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i);
        if(length>=0&&length<=128){
            len += 1;
        }else{
            len += 2;
        }
    }
    return len;
    */
}

favoriteObj.initReturnMsg = function(){
    favoriteObj.returnMsg = {rst:true,msg:''};
}


favoriteObj.addCheckName = function(name){
    favoriteObj.initReturnMsg();
    if(!name) {
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '标题不能为空';
        return favoriteObj.returnMsg;
    }
    if(favoriteObj.getByteLen(name) > favoriteObj.nameMaxLen){
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '最多输入8个字或16个字符';
        return favoriteObj.returnMsg;
    }
    return favoriteObj.returnMsg;
}
favoriteObj.addCheckDesc = function(desc){
    favoriteObj.initReturnMsg();
    if(desc && favoriteObj.getByteLen(desc) > favoriteObj.descMaxLen){ 
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '最多输入200个字符';
        return favoriteObj.returnMsg;
    }
    return favoriteObj.returnMsg;
}

favoriteObj.addGroup = function(data){
    return XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxAddFavoriteGroup(),data);
}
favoriteObj.delGroup = function(data){
    return XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxDelFavoriteGroup(),data);
}

favoriteObj.addFavorite = function(data){
    return  XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxAddFavoriteNew(),data);
}
favoriteObj.editFavorite = function(data){
    return  XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxEditFavoriteGroup(),data);
}

favoriteObj.delFavorite = function(luId,groupId){
    return  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxCancelFavorite(luId,groupId),'json');
}
 
 /*global function*/
function initCommentClick()
{
    //{{{
    $('#thisroom').click(function(){
        if($(this).hasClass('cur')) {
            return false;
        }
        $(this).removeClass();
        $(this).addClass("cur dp_ico1");
        $('#otherroom').removeClass();
        $('#otherroom').addClass('dp_ico2');
        $('#comment_box').show();
        $('#othercomment_box').hide();
        commentGoodRateAnimate('comment');
        commentBarAnimate('comment');
        try{DetailPageApp.diaryPartTop = $('#diaryPart').offset().top;} catch(e) {};
    });

    $('#otherroom').click(function(){
        if($(this).hasClass('cur')) {
            return false;
        }
        $(this).removeClass();
        $(this).addClass("cur dp_ico2");
        $('#thisroom').removeClass();
        $('#thisroom').addClass('dp_ico1');
        $('#comment_box').hide();
        $('#othercomment_box').show();
        commentGoodRateAnimate('othercomment');
        commentBarAnimate('othercomment');
        try{DetailPageApp.diaryPartTop = $('#diaryPart').offset().top;} catch(e) {};
    });
    $('.score-rate').html($('#comment_box .rateSpan').attr('rate'));
    try{DetailPageApp.diaryPartTop = $('#diaryPart').offset().top;} catch(e) {};

    $('#load_Ajax_GetDetalCommentAndOtherComment .thumbimg img').each(function(){
        $(this).get(0).onload = function(){
            var img = new Image();
            img.src = $(this).attr('src');
        }
    });
    $("img").lazyload();

    //}}}
}

function getComment(pageNo)
{
    //{{{
    var lodgeId = $('#lodgeUnitId').attr("value");
    var cityDomain = $('#cityDomain').val();
    var pageStr = '';
    if(typeof(pageNo) == 'undefined') pageNo = 1;
    XZWebAjax.getSpider('', true, XZWebUrlWriter.getAjax_GetDetailComment(lodgeId,cityDomain,pageNo),{},false,function(data){
        if(data)
        {
            $('#selfcomment').html(data);
            var commentPartTop = $('#load_Ajax_GetDetalCommentAndOtherComment').offset().top-50;
            $(document).scrollTop(commentPartTop);
        }
    },'html');
    //}}}
}

function getOtherComment(pageNo)
{
    //{{{
    var lodgeId = $('#lodgeUnitId').attr("value");
    var pageStr = '';
    if(typeof(pageNo) == 'undefined') pageNo = 1;
    XZWebAjax.getSpider('', true, XZWebUrlWriter.getAjax_GetOtherDetailComment(lodgeId,pageNo),{},false,function(data){
        if(data)
        {
            $('#othercomment').html(data);
            var commentPartTop = $('#load_Ajax_GetDetalCommentAndOtherComment').offset().top-50;
            $(document).scrollTop(commentPartTop);
        }
    },'html');
    //}}}
}

function commentGoodRateAnimate(type)
{
    //{{{
    var comment_box;
    var goodRate;
    if (type == 'comment') {
        comment_box = $("#comment_box");
    } else if(type == 'othercomment') {
        comment_box = $("#othercomment_box");
    } else {
        return false;
    }
    span = comment_box.find('.rateSpan');
    goodRate = span.attr('rate');
    if (goodRate == undefined || goodRate <= 0 || goodRate > 100) {
        goodRate = 100;
    }
    span.text(goodRate);
    var s = 0;
    var w = setInterval(function () {
        s++;
        span.text(s+'%');
        if (s == goodRate) {
            clearInterval(w);
        }
    }, 8);
    //}}}
}

function commentBarAnimate(type)
{
    //{{{
    var comment_bar;
    var barRate;
    if (type == 'comment') {
        comment_bar = $("#comment_box").find('.bar_cur');
    } else if(type == 'othercomment') {
        comment_bar = $("#othercomment_box").find('.bar_cur');
    } else {
        return false;
    }
    comment_bar.each(function(i,item){
        barRate = $(item).attr('score');
        $(item).width(0);
        $(item).animate({
            width: barRate+"%"
        },1000);
    });
    //}}}
}

function calTotalPrice()
{
    //{{{
    var lodgeId = $('#lodgeUnitId').val();
    var sameRoomNum = $('#sameRoomNum').val();
    if(!sameRoomNum) sameRoomNum = 1;
    var startDate = $('#startdate').val();
    var endDate = $('#enddate').val();
    var timeDifference = compareDate(startDate) - compareDate(endDate);
    $("#ui-datepicker-div").hide();
    if(startDate != 'yyyy-mm-dd' && startDate != '入住日期' && startDate != '' && endDate != 'yyyy-mm-dd' && endDate != '退房日期' && endDate != '')
    {
        if (timeDifference >= 0)
        {
            alert("退房日期应大于入住日期");
            endDate = changeDate(startDate,'+1');
            $('#enddate').attr('value',endDate);
        }
        var rand = Math.floor(Math.random()*10000);
        getCancelRuleDate(startDate,endDate);
        $.ajax({
            type: "get",
            url: "/ajaxRequest/Ajax_getTotalPrice",
            data: "lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+rand,
            success: handleUpdatePriceArea,
            error : handleReqError
        });
    }
    //}}}
}
function handleReqError(data,textStatus,XMLHttpRequest){
    revoltReptile();
}

function clearDetialCalendar()
{
    //{{{
    var rand = Math.floor(Math.random()*10000);
    var lodgeId = $('#lodgeUnitId').val();
    $.ajax({
        type: "get",
        url: "/ajaxRequest/Ajax_initPriceArea",
        data: "lodgeId="+lodgeId+"&rand="+rand,
        success: handleUpdatePriceArea,
        error : handleErrorReq
    });
    //}}}
}

function revoltReptile(XMLHttpRequest){
    var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
    if(reaponseHeader){
        window.location.href = reaponseHeader;
    }
};

function handleErrorReq(data,textStatus,XMLHttpRequest){
    revoltReptile(XMLHttpRequest);
}

function handleUpdatePriceArea(data,textStatus,XMLHttpRequest)
{
    revoltReptile(XMLHttpRequest);
    //{{{
    if(data)
    {
        $('.reserve_box').remove();
        $('#detailBookArea').html(data);
        DetailPageApp.initDetailBookArea();
        var avgprice = $('#avgprice').val();
        var priceTip = $('#priceTip').val();
        $('.detail_avgprice').html(avgprice);
        $('#scrollPrice').find('span').html(avgprice);
        $('#scrollPrice').find('em').html(priceTip);
        $('#pricePart').find('span').html(avgprice);
        $('#pricePart').find('em').html(priceTip);
        DetailPageApp.floatRightBoxHeight = $('#floatRightBox').height()+46;
    }else
    {

    }
    //}}}
}

function getCancelRule(lodgeId,startDate,endDate,sameRoomNum)
{
    //{{{
    $.ajax({
        type: "get",
        url: "/ajaxRequest/AJAX_GetCancelRule4Detail",
        async:false,
        data: "luid="+lodgeId+"&roomnum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime(),
        success: function(data) {
            var dataObj=eval("("+data+")");
            if(dataObj['error'] == '1')
            {
                alert(dataObj['message']);
            }
            else
            {
                if(dataObj['message']['showRule1'])
                {
                    $("#rule1").show();
                }
                else
                {
                    $("#rule1").hide();
                }
                $("span[name='checkinday']").html(dataObj['message']['checkinDay']);
                $("span[name='cancelpayallday']").html(dataObj['message']['crvnDay']);
                $("span[name='punishprice']").html(dataObj['message']['punishPrice']);
                $("span[name='punishresetprice']").html(dataObj['message']['punishRestPrice']);
            }
        }
    })
    //}}}
}

//百团大战领券活动 2018.8开始
if($('.baituanBtn').length != 0){
    $('.baituanBtn').click(function() {
        if($('#loginUserId').length != 0){
            var userid = $('#loginUserId')[0].value;
            var couponActivityId = $('.baituanBtn').attr('data-couponapplyid');
            $('.baituanBtn').attr('disabled',true);
            XZWebAjax.get(XZWebUrlWriter.getAjax_baituanCoupon(couponActivityId,userid),{},true,
                function (data) {
                    var res = data;
                    if (res.status == 1) {
                        $('.baituanBtn').text('已领取');
                    }else if(res.status == 0){
                        $(".baituanBtn").removeAttr("disabled");
                        alert(res.errmsg)
                    }
                })
        }else{
            $('.logindialog').click();
        }
    })
}
//百团大战领券活动 2018.8结束
function initBookClick()
{
    //{{{
    $('#detailBookArea').on('click','#day_yuding',function(){
        var lodgeId = $('#lodgeUnitId').attr("value");
        var sameRoomNum = $('#sameRoomNum').attr('value');
        var startDate = $('#startdate').attr('value');
        var endDate = $('#enddate').attr('value');
        if ((startDate == '入住日期' || startDate == '') || (endDate == '退房日期' || endDate == ''))
        {
            $('#startenddate').click();
            return false;
        }
        if($('#loginUserId').length == 0){
            sessionStorage.setItem("from","book");
            document.cookie = 'startDate='+startDate;
            document.cookie = 'endDate='+endDate;
            if($(".region.nation-num")){
                $(".region.nation-num").remove();
            }
            XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},false,
                function(ajaxRsponse){
                    if(ajaxRsponse.status == 1){
                        $('#input-mobile').after(ajaxRsponse.sucmsg);
                    } else {
                        alert(ajaxResponse.errmsg);
                    }
                });
            XZWebRegByMobileDialog.showRegForm();
        } else {
            getRoomBookAbleAndBook(lodgeId,sameRoomNum,startDate,endDate);
        }
    });
    //}}}
}

function getRoomBookAbleAndBook(lodgeId,sameRoomNum,startDate,endDate)
{
    //{{{
    $.ajax({
        type: "get",
        url: "/ajaxRequest/Ajax_GetRoomBookAble",
        async:false,
        dataType:'json',
        data: "lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime(),
        success: function(data) {
            var dataObj=data;
            if(dataObj['error'] == '1')
            {
                if(dataObj['type'] === 'repeatorder')
                {
                    buildRepeatOrderDialog();
                } else {
                    alert(dataObj['message']);
                }
            } else {
                var bookUrl = $('#bookUrl').val();
                var calendarCode = sessionStorage.getItem('calendarCode_'+ lodgeId);
                var bookParams = 'luid='+lodgeId+'&roomNum='+parseInt(sameRoomNum)+'&checkinDay='+startDate+'&checkoutDay='+endDate+'&calendarCode='+calendarCode;;
                if($('#filterKey').val() !='')
                    bookParams+='&filterKey='+$('#filterKey').val();
                if(bookUrl.indexOf('?') > -1)
                {
                    bookUrl +='&'+bookParams;
                }
                else {
                    bookUrl +='?'+bookParams;
                }
                var partner = $('#partner').attr("value");
                if(partner == 'lotour'){
                    $('body').empty();
                    var lotour='<div class="co_lt_main"><img src="pic_tz.jpg"/*tpa=http://jci.xiaozhustatic1.com/images/pic_tz.jpg*/ width="399" height="105" /></div>';
                    $('body').html(lotour);
                    setTimeout(function(){
                        location.href=bookUrl;
                    },3000)
                }else{
                    location.href=bookUrl;
                }
            }
        },
        error:function(XMLHttpRequest,textStatus,data){
            console.log("XMLHttpRequest",XMLHttpRequest);
            revoltReptile(XMLHttpRequest);
        }
    });
    searchEvent('detailpage');
    //}}}
}

// 领取代金券
function initReceiveCoupon () {
    var isReceiving = false;
    return function () {
        $('.receive_coupon .coupon').click(function () {
            if (!$('#loginUserId').length) {
                return $('.logindialog').click();
            }
            if (isReceiving) {
                return;
            }
            var that = this;
            var couponActivityId = $(that).attr('data-id');
            var receivedText = $(that).attr('data-text');
            var userId = $('#loginUserId')[0].value;
            isReceiving = true;
            var receiveCouponCb = function (res) {
                isReceiving = false;
                var status = res.status;
                if (status === 1) {
                    xzToast.toast('代金券已经放入您的账户里，请使用哟~', 'success');
                    $(that).attr('disabled', 'disabled');
                    $(that).text(receivedText);
                } else if (status === 0) {
                    xzToast.toast(res.errmsg, 'error');
                }
            };
            XZWebAjax.get(XZWebUrlWriter.getAjax_baituanCoupon(couponActivityId, userId), {}, true, receiveCouponCb);
        });
    }
}

window.xzToast = {
    toast: function (msg, type) {
        if (!msg) return false;
        if (!$('body').find('.xz_toast').length) {
            var div = '<div class="xz_toast"><span class="toast_txt">' + msg + '</span></div>';
            $('body').append(div);
            $('.xz_toast').css({
                "position": "fixed",
                "z-index": '1002',
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
            $('.xz_toast .toast_txt').css({
                "background-image": "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)",
                "background-position": 'left center',
                "background-repeat": 'no-repeat',
                "padding": "10px 0 10px 30px"
            });
        } else {
            $('.xz_toast .toast_txt').html(msg);
        }
        $('.xz_toast').css({
            "background": type === "error" ? "#FFEBF2" : "#D4EDEB",
            "color": type === "error" ? "#ff4081" : "#26A69A",
            "border-color": type === "error" ? "#FFEBF2" : "#D4EDEB"
        });
        $('.xz_toast .toast_txt').css({
            "background-image": type === "error" ? "url('icon-error.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-error.png*/)" : "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)"
        });
        $('.xz_toast').show();
        var timer = setTimeout(function () {
            $('.xz_toast').hide();
            $('.xz_toast .toast_txt').html('');
            window.clearInterval(timer);
            timer = null;
        }, 3 * 1000);
    },
};
window.DetailPageApp = {
    //{{{
    init : function(){
        //{{{
        this.initFixedHeader();
        DetailImageBox.init();
        this.initDetailShare();
        this.initCollection();
        this.initDetailBookArea();
        this.initDetailIntroPart();
        DetailMoreCalendar.init();
        DetailMap.init();
        //}}}
    },
    initDetailBookArea : function(){
        //{{{
        this.initCalendar();
        this.initRoomNumSelect();
        //}}}
    },
    initFixedHeader : function(){
        //{{{
        var that = this;
        var diaryNum = $('#landlordHasDiary').val();
        var detailImageBox = $('#detailImageBox');
        var introducePart = $('#introducePart');
        var mapPart = $('#detailMap');
        var rulesPart = $('#rulesPart');
        var commentPart = $('#load_Ajax_GetDetalCommentAndOtherComment');
        var scrollHeaderHeight = $('#scrollHeader').height();
        try{this.diaryPartTop = $('#diaryPart').offset().top;} catch(e) {};

        $('#scorllFather').children('li').on('click',function() {
            var curPartTop = 0;
            switch($(this).index()) {
                case 0:
                    curPartTop = detailImageBox.offset().top;
                    break;
                case 1:
                    curPartTop = introducePart.offset().top;
                    break;
                case 2:
                    curPartTop = mapPart.offset().top;
                    break;
                case 3:
                    curPartTop = rulesPart.offset().top;
                    break;
                case 4:
                    curPartTop = commentPart.offset().top;
                    break;
                case 5:
                    curPartTop = that.diaryPartTop+18;
                    break;
            }
            $(document).scrollTop(curPartTop-scrollHeaderHeight);
        });
        var hearderHeight = $('#scrollHeader').height();
        this.floatRightBoxHeight = $('#floatRightBox').height();

        $(window).scroll(function() {
            var scrollTop = $(document).scrollTop();
            var otherRoomPart = $('#otherRoomPart').offset().top;
            if(diaryNum && diaryNum != '0') {
                if(scrollTop >= detailImageBox.offset().top) {
                    $('#scrollHeader').show();
                    $('#pricePart').hide();
                    left = $('#scrollPrice').offset().left;
                    $('#floatRightBox').css({'position':'fixed','top':hearderHeight,'left':left});
                } else {
                    $('#floatRightBox').css('position','static');
                    $('#scrollHeader').hide();
                    $('#pricePart').show();
                }
                if(scrollTop > (otherRoomPart-that.floatRightBoxHeight-hearderHeight)) {
                    $('#floatRightBox').css('top',hearderHeight-(scrollTop-(otherRoomPart-that.floatRightBoxHeight-hearderHeight+36))+'px');
                }

                if(scrollTop < introducePart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(0).addClass('cur');
                } else if(scrollTop < mapPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(1).addClass('cur');
                } else if(scrollTop < rulesPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(2).addClass('cur');
                } else if(scrollTop < commentPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(3).addClass('cur');
                } else if(scrollTop < that.diaryPartTop-scrollHeaderHeight-10){
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(4).addClass('cur');
                } else if(scrollTop > that.diaryPartTop-scrollHeaderHeight-10){
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(5).addClass('cur');
                }
            } else {
                if(scrollTop >= detailImageBox.offset().top) {
                    $('#scrollHeader').show();
                    $('#pricePart').hide();
                    left = $('#scrollPrice').offset().left;
                    $('#floatRightBox').css({'position':'fixed','top':hearderHeight,'left':left,'z-index':'989'});
                    if(scrollTop > (otherRoomPart-that.floatRightBoxHeight-hearderHeight)) {
                        $('#floatRightBox').css('top',hearderHeight-(scrollTop-(otherRoomPart-that.floatRightBoxHeight-hearderHeight+36))+'px');
                    }
                } else {
                    $('#floatRightBox').css('position','static');
                    $('#scrollHeader').hide();
                    $('#pricePart').show();
                }
                if(scrollTop < introducePart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(0).addClass('cur');
                } else if(scrollTop < mapPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(1).addClass('cur');
                } else if(scrollTop < rulesPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(2).addClass('cur');
                } else if(scrollTop < commentPart.offset().top-scrollHeaderHeight-10) {
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(3).addClass('cur');
                } else if(scrollTop > commentPart.offset().top-scrollHeaderHeight-10){
                    $('#scorllFather').find('li').removeClass('cur');
                    $('#scorllFather').find('li').eq(4).addClass('cur');
                }
            }
        });

        window.onresize = function(){
            $(document).trigger('scroll');
            DetailImageBox.checkScreenWidth();
            if($('#lightBoxDialog:visible').length){
                DetailLightBox.checkScreenWidth();
            }
            DetailPageApp.floatRightBoxHeight = $('#floatRightBox').height()+46;
            if($('#greatFd').length && $(window).height() <= 640){
                $('.w_240').width('142');
            }else{
                $('.w_240').width('215');
            }
        };


        //}}}
    },
    initDetailShare : function(){
        //{{{
        $('.detail-default-share').click(function(){
            showShareDialog();
        });
        //}}}
    },
    initCalendar : function(){
        //{{{
        var that = this;
        var luId = $('#lodgeUnitId').val();
        sessionStorage.setItem('calendarCode_'+luId,true);
        $('#startenddate,#detailCalendarIco').click(function(){
            var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();
            $('#imgMouseCusor').unbind('mousemove').removeClass('cursor_up cursor_down cursor_left cursor_right');
        });
        var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();
        if(!calendarCode){
            return false;
        }
        this.detailCalendar = new execCalendar('#startenddate',{autoSearch:true,showPrice:true,calendar:'#calendar-box'});
        // $('.reserve_date .reserve_ico').click(function(){
        //     $('#calendar-box').show();
        //     $('#imgMouseCusor').unbind('mousemove').removeClass('cursor_up cursor_down cursor_left cursor_right');
        // });

        $('#enddate').change(function(){
            $('#imgMouseCusor').bind('mousemove',DetailImageBox.cursorMouseMove);
        });
        //}}}
    },
    initRoomNumSelect : function(){
        //{{{
        $('#sameRoomNum,.select_box .select_arrow').click(function(e){
            if($('#detailRoomNumSelect:visible').length){
                $('#detailRoomNumSelect').hide();
            } else {
                $('#detailRoomNumSelect').show();
            }
        });
        $('#detailRoomNumSelect li').click(function(e){
            if($('#sameRoomNum').val() != $(this).text()){
                $('#sameRoomNum').val($(this).text());
                calTotalPrice();
            }
            $('#detailRoomNumSelect').hide();
        });
        //}}}
    },
    initCollection : function(){
        //{{{
        var that = this;
        $('.collection_btn').click(function(e){
            e.preventDefault();
            if(!$('#loginUserId').length){
                sessionStorage.setItem("from","collection");
                if($(".region.nation-num")){
                    $(".region.nation-num").remove();
                }
                XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},false,
                    function(ajaxRsponse){
                        if(ajaxRsponse.status == 1){
                            $('#input-mobile').after(ajaxRsponse.sucmsg);
                        } else {
                            alert(ajaxResponse.errmsg);
                        }
                    });
                XZWebRegByMobileDialog.showRegForm();
            } else {
                that.collectionRoom(true);
            }
        });
        $('.un_collection_btn').click(function(e){
            e.preventDefault();
            that.collectionRoom(false);
        });
        var key = sessionStorage.getItem('from');
        if(key == 'collection'){
            that.collectionRoom(true);
        }
        //}}}
    },
    collectionRoom : function(state){
        //{{{
        var loginUserid=$('#loginUserId').val();
        var lodgeUnitId=$('#lodgeUnitId').val();
        if(state){
            var data =  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxAddFavoritePage(lodgeUnitId),'html');
            $('.mask').show();
            $('#addFavoritePop').empty().html(data).show();
            var dialog = $("#addFavoritePop");
            dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed','z-index':99999});
            $('#addFavoritePop').css('min-height','0px');

            $('#addFavoriteSave').off('click');
            $('#addFavoriteSave').on('click',function(){
                var groupIds =  $('input[name="selectGroup"]');
                var datas = [];

                for(var i in groupIds){
                    if(groupIds[i].checked){
                        datas.push($(groupIds[i]).val());
                    }
                }
                if(!datas.length){
                    alert('请选择收藏分组');
                    return false;
                }
                var postData = {
                    luId : lodgeUnitId,
                    groupIds  : datas
                };

                var rst = favoriteObj.addFavorite(postData);
                if(rst.status == 1){
                    $('#collectionBtn').closest('ul').hide();
                    $('#unCollectionBtn').closest('ul').show();
                    $('#addFavoriteCancel').trigger('click');
                }else{
                    alert(rst.errmsg);
                }
            });
            $('#addFavoriteCancel').off('click');
            $('#addFavoriteCancel').on('click',function(){
                $('#addFavoritePop').hide();
                $('.mask').hide();
            });
            $('#addNewFavoriteGroup').off('click');
            $('#addNewFavoriteGroup').on('click',function(){
                $('#addFavoritePop').hide();
                $('#Pop_mask').show();
                $('#addGroupPop').show();
                $('#addFavoriteGroupPop').show();
                var dialog = $("#addFavoriteGroupPop");
                dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed','z-index':99999});
            })
            $('#addGroupCancel').off('click');
            $('#addGroupCancel').on('click',function(){
                $('.tips_msg').hide();
                $('#addGroupPop').hide();
                $('#Pop_mask').hide();
                $('#addFavoritePop').hide();
                DetailPageApp.collectionRoom(true);
            });
            $('#groupName').keyup(function(){
                $('.tips_msg').hide();
            });
            $('#addGroupSave').off('click');
            $('#addGroupSave').on('click',function(){

                var name = $('#groupName');
                var desc = $('#groupDesc');
                var isprivate =  $('input[name="groupPrivate"]:checked').val();

                var checkName = favoriteObj.addCheckName($.trim(name.val()));
                if(!checkName.rst){
                    $('.tips_msg').html('<i></i>'+checkName.msg).show();
                    return false;
                }
                var checkDesc = favoriteObj.addCheckDesc($.trim(desc.val()));
                if(!checkDesc.rst){
                    return false;
                }
                var data = {
                    groupId : '',
                    name : name.val(),
                    desc : desc.val(),
                    isprivate : isprivate,
                }
                var res = favoriteObj.addGroup(data);
                if(res.status == 1){
                    DetailPageApp.collectionRoom(true);
                    $('#addGroupPop').hide();
                    $('#Pop_mask').hide();
                }else{
                    alert(res.errmsg);
                }
            });

            return false;
        }

        var data =  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxCancelAllFavorite(lodgeUnitId),'json');
        if(data.status==1){
            $('#collectionBtn').closest('ul').show();
            $('#unCollectionBtn').closest('ul').hide();
        }else{
            alert(data.errmsg);
        }
        //}}}
    },
    initDetailIntroPart : function(){
        //{{{
        $('#introducePart .detail_intro_item').each(function(){
            var itemContainer = $(this);
            var itemContent = itemContainer.find('.intro_item_content');
            var itemContentHeight = itemContainer.height();
            if(itemContentHeight >= itemContainer.attr('hideheight')){
                var stopBtn = itemContainer.find('.stop');
                var openBtn = itemContainer.find('.open');
                openBtn.click(function(){
                    stopBtn.show();
                    itemContent.css({'height':itemContentHeight});
                    openBtn.hide();
                    stopBtn.openPosition = $(document).scrollTop();
                });
                stopBtn.click(function(){
                    openBtn.show();
                    itemContent.css({'height':itemContainer.attr('showheight'),'overflow':'hidden'});
                    stopBtn.hide();
                    $(document).scrollTop(stopBtn.openPosition);
                });
                stopBtn.trigger('click');
            }else{
                itemContent.addClass('info_text_mid').removeClass('intro_item_content');
            }
        });

        //}}}
    }
    //}}}
};

window.DetailImageBox = {
    //{{{
    init : function(preBtn)
    {
        //{{{
        var that = this;
        this.curImgIndex = 1;
        this.curBigImg = $('#curBigImage');
        this.mouseCursor = $('#imgMouseCusor');
        this.initThumbNav();
        this.thumbNav.find('.pho_layer,.pho_cur').click(function(){
            that.thumbNavClick.call(that,$(this));
        });
        $('#detailImageBox').on('click','.cursor_up,.cursor_left,.detail-image-prev',function(e){
            that.prevImg.call(that);
        }).on('click','.cursor_right,.cursor_down,.detail-image-next',function(e){
            that.nextImg.call(that);
        });

        this.checkScreenWidth();
        this.mouseCursor.bind('mousemove',this.cursorMouseMove);
        //}}}
    },
    initThumbNav : function()
    {
        //{{{
        this.thumbNav = $('.detail-thumb-nav li');
        //this.thumbNav.first().before(this.thumbNav.last());
        $('.detail-thumb-nav li').eq(1).find('.pho_cur').removeClass('pho_cur').addClass('pho_layer');
        $('.detail-thumb-nav li').eq(1).find('.pho_layer').removeClass('pho_layer').addClass('pho_cur');
        //}}}
    },
    cursorMouseMove : function(e){
        if(DetailImageBox.imgWidth == 800){
            if(e.offsetY <= DetailImageBox.imgHeight/2){
                DetailImageBox.mouseCursor.removeClass('cursor_up cursor_down cursor_left cursor_right').addClass('cursor_up');
            } else {
                DetailImageBox.mouseCursor.removeClass('cursor_up cursor_down cursor_left cursor_right').addClass('cursor_down');
            }
        } else {
            if(e.offsetX <= DetailImageBox.imgWidth/2){
                DetailImageBox.mouseCursor.removeClass('cursor_up cursor_down cursor_left cursor_right').addClass('cursor_left');
            } else {
                DetailImageBox.mouseCursor.removeClass('cursor_up cursor_down cursor_left cursor_right').addClass('cursor_right');
            }
        }
    },
    updateThumbNav : function(){
        //{{{
        if(this.thumbNav.length > 5){
            if(this.curImgIndex > this.medimIndex && this.curImgIndex<this.thumbNav.length - this.medimIndex-3){
                this.thumbNav.show();
                $('.detail-thumb-nav li:lt('+(this.curImgIndex - this.medimIndex)+')').hide();
            }else if(this.curImgIndex >= this.thumbNav.length - this.medimIndex-3){
                this.thumbNav.show();
                $('.detail-thumb-nav li:lt('+(this.thumbNav.length - this.navShowLength)+')').hide();
            }else{
                this.thumbNav.show();
            }
        }
        this.thumbNav.find('.pho_cur').removeClass('pho_cur').addClass('pho_layer');
        this.thumbNav.eq(this.curImgIndex).find('.pho_layer').removeClass('pho_layer').addClass('pho_cur');
        this.preLoadThumb();
        //}}}
    },
    thumbNavClick : function(element){
        //{{{
        this.curImgIndex = this.thumbNav.index(element.closest('li'));
        this.changeImg();
        //}}}
    },
    prevImg : function ()
    {
        //{{{
        /*this.thumbNav = $('.detail-thumb-nav li');
        this.thumbNav.first().before(this.thumbNav.last());
        this.curImgIndex = 0;
        this.changeImg();*/
        this.curImgIndex --;
        this.curImgIndex = this.curImgIndex < 0 ? this.thumbNav.length-1 : this.curImgIndex;
        this.changeImg();
        //}}}
    },
    nextImg : function()
    {
        //{{{
        /*this.thumbNav = $('.detail-thumb-nav li');
        this.thumbNav.last().after(this.thumbNav.first());
        this.curImgIndex = 2;
        this.changeImg();*/
        this.curImgIndex ++;
        this.curImgIndex = this.curImgIndex > this.thumbNav.length-1 ? 0 : this.curImgIndex;
        this.changeImg();
        //}}}
    },
    changeImg : function()
    {
        //{{{
        var that = this;
        var curNavImg = this.thumbNav.eq(this.curImgIndex).find('img');
        var curBigImg = this.curBigImg.get(0);
        curBigImg.onload = function(){
            var imgRate = curNavImg.attr('data-width')/curNavImg.attr('data-height');
            if(imgRate > 1 && imgRate <= 1.5){
                var imgWidth = that.imgWidth;
                var imgHeight = that.imgWidth/imgRate;
            } else {
                var imgHeight = that.imgHeight;
                var imgWidth = that.imgHeight*imgRate;
            }
            that.curBigImg.attr({'width':imgWidth,'height':imgHeight});
            //that.curBigImg.show();
            curBigImg.onload = null;
        };
        this.curBigImg.attr('src',curNavImg.attr('data-bigimg'));
        //this.curBigImg.hide();
        if(curNavImg.attr('data-intro') == ''){
            $('#curImgIntro').hide();
        } else {
            $('#curImgIntro').show();
        }
        $('#curImgIntro span').html(curNavImg.attr('data-intro'));
        $('.detail-thumb-nav li').find('.pho_cur').removeClass('pho_cur').addClass('pho_layer');
        $('.detail-thumb-nav li').eq(1).find('.pho_layer').removeClass('pho_layer').addClass('pho_cur');
        this.updateThumbNav();
        this.preLoadImg();
        //}}}
    },
    checkScreenWidth : function(){
        //{{{
        this.medimIndex = 1;
        if($('#detailImageBox').width() == 920){
            this.navShowLength = 6;
            this.imgWidth = 800;
            this.imgHeight = 533;
            this.mouseCursor.width(800);
            this.mouseCursor.height(533);
        } else {
            this.navShowLength = 5;
            this.imgWidth = 620;
            this.imgHeight = 413;
            this.mouseCursor.width(620);
            this.mouseCursor.height(413);
        }
        this.changeImg();
        //}}}
    },
    preLoadImg : function(){
        //{{{
        var prevImgIndex = this.curImgIndex-1 < 0 ? this.thumbNav.length-1 : this.curImgIndex-1;
        var prevNavImg = this.thumbNav.eq(prevImgIndex).find('img');
        var prevImgElement = new Image();
        prevImgElement.src = prevNavImg.attr('data-bigimg');
        for(var i=1;i<3;i++){
            var nextImgIndex = this.curImgIndex+i > this.thumbNav.length-1 ? 0 : this.curImgIndex+i;
            var nextNavImg = this.thumbNav.eq(nextImgIndex).find('img');
            if(nextNavImg.attr('hasload') != '1'){
                var nextImgElement = new Image();
                nextImgElement.src = nextNavImg.attr('data-bigimg');
                nextNavImg.attr('hasload',1);
            }
        }
        //}}}
    },
    preLoadThumb : function(){
        var startIndex = this.curImgIndex - 6;
        startIndex = startIndex < 0 ? 0 : startIndex;
        var endIndex = this.curImgIndex + 6;
        $('.detail-thumb-nav li').slice(startIndex,endIndex).each(function(){
            var img = $(this).find('img');
            if(img.attr('hasload') != '1'){
                img.attr({'src':img.attr('data-src'),'hasload':1});
            }
        });
    }
    //}}}
};

window.DetailMoreCalendar = {
    //{{{
    isAbroad : $('#isAbroad').val() == 1 ? true : false,
    init : function(){
        //{{{
        this.luid = $('#lodgeUnitId').val();
        this.editable = true;
        var that = this;
        $('#detailBookArea').on('click','#showMoreCalendar',function(){
            var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();
            if(!calendarCode){
                LodgeUnitCalendarImageCodeValidator.showImageCodeBox();
                return false;
            }
            that.getCalendarHtml(new Date(),$('#leftTbody'),$('#leftMonth'));
            var day = new Date();
            var y = day.getFullYear();
            var m = day.getMonth();
            that.getCalendarHtml(new Date(y,m+1,1),$('#rightTbody'),$('#rightMonth'));
            $('#fullCalendarDialog').show();
            $('body').css('overflow','hidden');
            $('#showMoreCalendar').attr('bodyposition',$(document).scrollTop());
            //if($('#showMoreCalendar').attr('hideleftarrow') != '1'){
            $('#fullCalendarDialog').find('.arrow_l1').hide();
            //}
            if(DetailMoreCalendar.isAbroad){
                $('.calendar_r').after('<div class="calendar_time">以'+$('#cityName').val()+'时间为准</div>');
            }
        });
        $('#fullCalendarDialog').on('click','.colsed',function(e){
            $('#fullCalendarDialog').hide();
            $('body').css('overflow','visible');
            //$('#showMoreCalendar').attr('hideleftarrow',1);
            if($('#showMoreCalendar').attr('bodyposition')){
                $(document).scrollTop($('#showMoreCalendar').attr('bodyposition'));
            }
        })
            .on('click','.arrow_r1',function(){
                $('#fullCalendarDialog').find('.arrow_l1').show();
                var leftYear = $('#leftMonth').attr('y');
                var leftMonth = $('#leftMonth').attr('m');

                var rightYear = $('#rightMonth').attr('y');
                var rightMonth = $('#rightMonth').attr('m');

                that.showLeftCalendar(leftYear,leftMonth-(-1));
                that.showRightCalendar(rightYear,rightMonth-(-1));
            })
            .on('click','.arrow_l1',function(){
                var newDate = new Date();
                var currentMonth = newDate.getMonth();
                var currentYear = newDate.getFullYear();
                var leftYear = $('#leftMonth').attr('y');
                var leftMonth = $('#leftMonth').attr('m');
                if(leftMonth == currentMonth-(-3) && currentYear == leftYear){
                    $(this).hide();
                }
                var rightYear = $('#rightMonth').attr('y');
                var rightMonth = $('#rightMonth').attr('m');

                that.showLeftCalendar(leftYear,leftMonth-3);
                that.showRightCalendar(rightYear,rightMonth-3);
            });
        //}}}
    },
    showLeftCalendar : function(leftYear,leftMonth)
    {
        var leftMonthHtml = $('#leftMonth');
        var nowDate = new Date();
        this.getCalendarHtml(new Date(leftYear,leftMonth,1),$('#leftTbody'),leftMonthHtml);
        if(leftMonthHtml.attr('y') == nowDate.getFullYear() && leftMonthHtml.attr('m') == nowDate.getMonth()-(-1) ){
            $('#fullCalendarDialog').find('.arrow_l1').hide();
        } else {
            $('#fullCalendarDialog').find('.arrow_l1').show();
        }
    },
    showRightCalendar : function(rightYear,rightMonth)
    {
        var rightMonthHtml = $('#rightMonth');
        this.getCalendarHtml(new Date(rightYear,rightMonth,1),$('#rightTbody'),rightMonthHtml);
    },
    getCalendarHtml : function(day,tbodynode,month){
        //{{{
        //tbodynode.children().remove();
        day.setDate(1);
        var firstDay = day.getDay();
        var newDate = new Date();
        var today = 0;
        if(newDate.getMonth() == day.getMonth() && newDate.getFullYear() == day.getFullYear()) {
            today = newDate.getDate();
        }

        var dateArray = [];
        for (var i = 0; i < 1; i++) {
            var toMonth = day.getMonth();
            for (var j = 1; j <= 37; j++) {
                day.setDate(j);
                if(j == 1) {
                    var week = day.getDay();
                    for(var k = 0;k < week;k++) {
                        dateArray.push({y:'',m:'',d:'',w:''});
                    }
                }
                if (day.getMonth(true) != toMonth){
                    break;
                }
                dateArray.push({y:day.getFullYear(),m:day.getMonth(),d:day.getDate(),w:day.getDay()});
            };
        };
        month.html(dateArray[15].y+'-'+(dateArray[15].m-(-1)));
        month.attr('y',dateArray[15].y);
        month.attr('m',dateArray[15].m-(-1));

        if(dateArray[15].m <= 7) {
            var startDate = dateArray[15].y + '-0' + (dateArray[15].m + 1) + '-01';
            var endDate = dateArray[15].y + '-0' + (dateArray[15].m + 2) + '-01';
        }else if(dateArray[15].m == 8){
            var startDate = dateArray[15].y + '-0' + (dateArray[15].m + 1) + '-01';
            var endDate = dateArray[15].y + '-' + (dateArray[15].m + 2) + '-01';
        }else if(dateArray[15].m == 11){
            var startDate = dateArray[15].y + '-' + (dateArray[15].m + 1) + '-01';
            var endDate = (dateArray[15].y+1) + '-01-01';
        } else {
            var startDate = dateArray[15].y + '-' + (dateArray[15].m + 1) + '-01';
            var endDate = dateArray[15].y + '-' + (dateArray[15].m + 2) + '-01';
        }
        var calendarCode = LodgeUnitCalendarImageCodeValidator.getCalendarCode();
        if(!calendarCode){
            LodgeUnitCalendarImageCodeValidator.showImageCodeBox();
            return false;
        }
        var url = XZWebUrlWriter.getAJAX_GetLodgeUnitCalendar(this.luid,startDate,endDate,this.editable,calendarCode);
        var afterVerifyAction = function () {
            XZWebAjax.postSpider('calendar', false,url,{},true,function(data){
                var dateHtml = '';
                for(var j = 0; j < 42; j++) {
                    if(dateArray[j] == undefined) continue;
                    var dayText =  dateArray[j].d;
                    if(today != 0 && j == today+firstDay-1 && !DetailMoreCalendar.isAbroad) {
                        dayText = '今日';
                    }
                    if(j >= firstDay) {
                        if(j%7 == 0) {
                            if(today != 0 && j<today+firstDay-1) {
                                dateHtml += '<tr><td class="col_gray">'+dayText+'</td>';
                            } else {
                                if(data[j-firstDay].state == 'available') {
                                    if(data[j-firstDay].pricetype == 'normal') {
                                        dateHtml+='<tr><td>'+dayText+'<br/><span class="col_gray">剩'+data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td>';
                                    } else {
                                        dateHtml+='<tr><td class="cur">'+dayText+'<br/><span class="col_gray">剩'+data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td>';
                                    }
                                } else {
                                    dateHtml += '<tr><td class="yz">'+dayText+'<p class="col_gray pt5">已租</p></td>';
                                }
                            }
                        } else  if(j%7 == 6) {
                            if(today != 0 && j<today+firstDay-1) {
                                dateHtml += '<td class="col_gray">'+dayText+'</td><tr><td colspan="7" class="calendar_line"></td></tr>';
                            } else {
                                if(data[j-firstDay].state == 'available') {
                                    if(data[j-firstDay].pricetype == 'normal') {
                                        dateHtml+='<td>'+dayText+'<br/><span class="col_gray">剩'+data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td></tr><tr><td colspan="7" class="calendar_line"></td></tr>';
                                    } else {
                                        dateHtml+='<td class="cur">'+dayText+'<br/><span class="col_gray">剩'+data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td></tr><tr><td colspan="7" class="calendar_line"></td></tr>';
                                    }
                                } else {
                                    dateHtml += '<td class="yz">'+dayText+'<p class="col_gray pt5">已租</p></td></tr><tr><td colspan="7" class="calendar_line"></td></tr>';
                                }
                            }
                        } else {
                            if(today != 0 && j<today+firstDay-1) {
                                dateHtml += '<td class="col_gray">'+dayText+'</td>';
                            } else {
                                if(data[j-firstDay].state == 'available') {
                                    if(data[j-firstDay].pricetype == 'normal') {
                                        dateHtml+='<td>'+dayText+'<br/><span class="col_gray">剩' +data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td>';
                                    } else {
                                        dateHtml+='<td class="cur">'+dayText+'<br/><span class="col_gray">剩' +data[j-firstDay].housenum+data[j-firstDay].word+'<br/>&yen;'+data[j-firstDay].houseprice+'</span></td>';
                                    }
                                } else {
                                    dateHtml += '<td class="yz">'+dayText+'<p class="col_gray pt5">已租</p></td>';
                                }
                            }
                        }
                    } else {
                        if(j%7 == 0) {
                            dateHtml+='<tr><td>'+dayText+'</td>';
                        } else  if(j%7 == 6) {
                            dateHtml+='<td>'+dayText+'</td></tr><tr><td colspan="7" class="calendar_line"></td></tr>';
                        } else {
                            dateHtml+='<td>'+dayText+'</td>';
                        }
                    }
                    if(j>27 && j == data.length-1+firstDay && j%7 != 6 && !DetailMoreCalendar.isAbroad){
                        dateHtml += '</tr><tr><td colspan="7" class="calendar_line"></td></tr>';
                    }
                }
                tbodynode.html(dateHtml);
            });
        };
        // 自动化测试忽略滑动验证
        if (cookieApi.getCookie('isAutoTest') === 'yes') {
            afterVerifyAction();
        } else {
            var spiderToken = localStorage.getItem('SPIDER_AVOID_TOKEN_calendar');
            if (spiderToken && spiderToken !== 'undefined') {
                afterVerifyAction();
            } else {
                $('#fullCalendarDialog').hide();
                var captcha = new Captcha({
                    init: window.captchaModel.showModel,
                    onSuccess: function () {
                        window.captchaModel.hideModel();
                        setTimeout(function () {
                            $('#showMoreCalendar').click();
                        }, 1000);
                    },
                    busiKey: 'calendar'
                });
            }
        }
        //}}}
    }
    //}}}
};
//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQgE7zkdkcCxvl92wQAMBeTiM1Aa8z8NY&callback=initMap&libraries=places" async defer></script>
window.DetailGMap = {
    //{{{
    init : function(){
        //{{{
        var that = this;
        if(typeof that.GMap === 'undefined') {
            this.loadJScript();
        }
        var mapTimer = setInterval(function() {
            if(typeof that.GMap === 'undefined') {
                DetailBMap.init();
            }
        },3000);
        setTimeout(function(){
            that.addLandMark();
        },1000);
        //}}}
    },
    loadJScript : function(){
        var mapKey = 'AIzaSyDQgE7zkdkcCxvl92wQAMBeTiM1Aa8z8NY';
        var script = '<script src="//maps.google.cn/maps/api/js?key='+mapKey+'&callback=DetailGMap.initMap&libraries=places" async defer></script>';
        $('body').append(script);
    },
    initMap : function () {
        //{{{
        var longitude = parseFloat($('#longitude').val());
        var latitude = parseFloat($('#latitude').val());
        var myLatlng = new google.maps.LatLng(latitude,longitude);
        DetailGMap.pyrmont  = {lat: latitude, lng: longitude};
        DetailGMap.GMap = new google.maps.Map(document.getElementById('detailMap'), {
            center: myLatlng,
            zoom: 15,
            scrollwheel:false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: true,
            fullscreenControl:false
        });
        marker = new google.maps.Marker({
            position: myLatlng,
            map: DetailGMap.GMap,
            icon: 'https://'+topLevelDomain+'/images/detail/icon_room.png'
        });
    },
    addLandMark : function(){
        var infowindow;
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(DetailGMap.GMap);

        service.nearbySearch({
            location: DetailGMap.pyrmont,
            radius: 1000,
            //rankBy :google.maps.places.RankBy.DISTANCE,
            types: ['restaurant','bus_station','subway_station','grocery_or_supermarket','convenience_store']
        }, callback);
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }
        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: DetailGMap.GMap,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
                //alert('mouseover');
                infowindow.setContent(place.name);
                infowindow.open(DetailGMap.GMap, this);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        }
        //}}}
    }//}}}
};
window.DetailMap = {
    config : {'公交站':{def:'icon_bus.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_bus.png*/,act:'icon_bus_cur.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_bus_cur.png*/,word:'bus_station',num:5},'餐饮':{def:'icon_eat.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_eat.png*/,act:'icon_eat_cur.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_eat_cur.png*/,word:'restaurant',num:7},'地铁':{def:'icon_subway.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_subway.png*/,act:'icon_subway_cur.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_subway_cur.png*/,word:'subway_station',num:2},'超市':{def:'icon_store.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_store.png*/,act:'icon_store_cur.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_store_cur.png*/,word:'grocery_or_supermarket',num:3},'便利店':{def:'icon_store.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_store.png*/,act:'icon_store_cur.png'/*tpa=http://jci.xiaozhustatic1.com/e19061101/icon_store_cur.png*/,word:'convenience_store',num:2}},
    init : function(){
        //{{{
        var that = this;
        that.isAbroad = $('#isAbroad').val();
        if(that.isAbroad >0){
            DetailGMap.init();
        }else{
            DetailBMap.init();
        }
    }//}}}
};
window.DetailBMap = {
    //{{{
    init : function(){
        //{{{
        var that = this;
        var mapTimer = setInterval(function() {
            if(typeof BMap === 'undefined') {
                that.loadJScript();
                return false;
            } else {
                clearInterval(mapTimer);
            }
            that.addLandMark();
        },1000);
        //}}}
    },
    loadJScript : function(){
        //{{{
        var mapKey = '457568d0dbd40f01bbeb6814389edc8e';
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//api.map.baidu.com/api?v=2.0&ak="+mapKey+"&s=1&callback=DetailBMap.initMap";
        document.body.appendChild(script);
        //}}}
    },
    initMap : function(){
        //{{{
        var map = new BMap.Map("detailMap",{enableMapClick:false});
        DetailBMap.map = map;
        map.disableScrollWheelZoom();
        var longitude = $('#longitude').val();
        var latitude = $('#latitude').val();
        var point = new BMap.Point(longitude,latitude);
        DetailBMap.point = point;
        var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/icon_room.png', new BMap.Size(40, 50));
        icon.setImageSize(new BMap.Size(40, 50));

        var marker = new BMap.Marker(point, {
            icon : icon
        });
        marker.setTop(true);
        var top_left_navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT});  //左上角，添加默认缩放平移控件
        map.addControl(top_left_navigation);
        // map.enableScrollWheelZoom();                 //启用滚轮放大缩小
        map.centerAndZoom(point, 15);
        map.addOverlay(marker);
        //}}}
    },
    addLandMark : function(){
        var options = {
            pageCapacity: 20,
            autoViewport: false,
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    var s = [];
                    var ret = [];
                    var datas = [];
                    for(var j = 0; j<results.length; j++){
                        ret = results[j];
                        var iconTag = DetailMap.config[ret.keyword];
                        for(var key in ret){
                            var wr = ret[key];
                            if(Array.isArray(wr) && wr.length > 1)
                            {
                                for (var i = 0; i < wr.length; i ++){
                                    var data = wr[i];
                                    if(datas.length == 20) break;
                                    if(i >= iconTag.num) break;
                                    data.iconTag = iconTag;
                                    datas.push(data);
                                }
                            }
                        }
                    }
                    DetailBMap.pointArrays = {};
                    for (var i = 0; i < datas.length; i ++){
                        var data = datas[i];
                        var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+data.iconTag.def, new BMap.Size(40, 50));
                        icon.setImageSize(new BMap.Size(40, 50));
                        var newPoint = new BMap.Point(data.point.lng,data.point.lat);
                        var marker = new BMap.Marker(newPoint,{icon : icon});

                        var key = 'xzmaker_'+i;
                        marker.xzkey = key;
                        //var infoParams = {'title': data.title,'offset':{width: 10, height: 10}};
                        //var infoWin = new BMap.InfoWindow(data.address,infoParams);
                        //DetailBMap.infoWindow[key]  = infoWin;
                        DetailBMap.pointArrays[key] = {point : newPoint,icon:data.iconTag};
                        DetailBMap.map.addOverlay(marker);
                        DetailBMap.addMarkerAddEventListener(marker);
                        var labelOpts = {
                            position : newPoint,
                        };
                        var defaultLabel = new BMap.Label(DetailBMap.addLabelHtml(key,data.title),labelOpts);

                        DetailBMap.map.addOverlay(defaultLabel);
                    }
                }
            }
        };
        var local = new BMap.LocalSearch(DetailBMap.map, options);
        //local.search('超市');
        local.searchNearby(['地铁','公交站','餐饮','超市','便利店'],DetailBMap.point,2000);
    },
    addLabelHtml : function(id,content){
        var html = '<div class="icons" id="label_'+id+'">'
            +'<div class="icon_des">'+content
            +'<span class="icon_arrow"></span>'
            +'</div>'
            +'</div>';
        return html;
    },
    addMarkerAddEventListener : function(marker){
        marker.addEventListener("mouseover", function (e) {
            var key = e.currentTarget.xzkey;
            var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+DetailBMap.pointArrays[key].icon.act, new BMap.Size(40, 50));
            icon.setImageSize(new BMap.Size(40, 50));
            this.setIcon(icon);
            //this.openInfoWindow(DetailBMap.infoWindow[key]);
            var leftoffset = 0;
            var rightoffset = 0;
            var topoffset = 0;
            if(($('#label_'+key).parent('.BMapLabel').offset().left - $('#detailMap').offset().left) < 49) {
                leftoffset = $('#label_'+key).parent('.BMapLabel').offset().left - $('#detailMap').offset().left;
            }
            if(($('#label_'+key).parent('.BMapLabel').offset().left - $('#detailMap').offset().left + 45) > $('#detailMap').width()) {
                rightoffset = $('#label_'+key).parent('.BMapLabel').offset().left - $('#detailMap').offset().left-$('#detailMap').width()+90;
            }
            if(($('#label_'+key).parent('.BMapLabel').offset().top - $('#detailMap').offset().top) < 49) {
                topoffset = 99 - ($('#label_'+key).parent('.BMapLabel').offset().top - $('#detailMap').offset().top);
            }

            if(leftoffset != 0) {
                DetailBMap.map.panBy(leftoffset,topoffset);
            }
            if(rightoffset != 0) {
                DetailBMap.map.panBy(-rightoffset,topoffset);
            }
            if(leftoffset == 0 && rightoffset == 0) {
                DetailBMap.map.panBy(0,topoffset);
            }
            $('#label_'+key).show();
        });
        marker.addEventListener("mouseout", function (e) {
            //this.closeInfoWindow();
            var key = e.currentTarget.xzkey;
            var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+DetailBMap.pointArrays[key].icon.def, new BMap.Size(40, 50));
            icon.setImageSize(new BMap.Size(40, 50));
            this.setIcon(icon);
            //this.setTop(false);
            $('#label_'+key).hide()
        });
    }
    //}}}
};
function getCancelRuleNew(){
    var luId = $("#lodgeUnitId").val();
        XZWebAjax.get(XZWebUrlWriter.getIndexCancelRule(luId), {}, true, function(res){
            if(res){
                if(res.isNewCancelRule){
                    if($('#startdate').val() && $('#enddate').val()){
                        getCancelRuleDate($('#startdate').val(), $('#enddate').val());
                    }else{
                        renderRuleHtml(res.cancelRule);
                    }
                    $('.old_rule_wrap').hide();
                    $('.new_rule_wrap').show();

                }else{
                    $('.old_rule_wrap').show();
                    $('.new_rule_wrap').hide();
                }
            }
        });
}
function renderRuleHtml(data){
    var ulHtml = '';
    var tipshtml = '';
    var isMore = false;
    $('.rule_tips').empty();
    $('.rule_detail').empty();
    $('.rule_tips_wrap').empty();
    for(var i = 0;i < data.ruleInfo.length; i++){
        if(data.ruleInfo[i].icon){
            var liHtml = '<li><h3>' + data.ruleInfo[i].text + '</h3></li>';
            ulHtml += liHtml;
        }else{
            var liHtml = '<li><h3>' + data.ruleInfo[i].text + '</h3></li>';
            tipshtml += liHtml;
        }
    }
    $('.rule_detail').append(ulHtml);
    $('.rule_tips_wrap').append(tipshtml);

    var ulTipsHtml = '';
    for(var i = 0;i < data.tips.length; i++){
        var liHtml = '<li><h3>' + data.tips[i]+ '</h3></li>';
        ulTipsHtml += liHtml;
    }
}
function getCancelRuleDate (checkInDay,checkOutDay){
    var luId = $("#lodgeUnitId").val();
    XZWebAjax.get(XZWebUrlWriter.getCancelRuleDate(luId, checkInDay, checkOutDay), {}, true, function(res){
        if(res.isNewCancelRule){
            renderRuleHtml(res.cancelRule);
            $('.old_rule_wrap').hide();
            $('.new_rule_wrap').show();

        }else{
            $('.old_rule_wrap').show();
            $('.new_rule_wrap').hide();
        }
    });
}
//页面逻辑
$(function(){
    DetailPageApp.init();
    $("img").lazyload();
    initBookClick();
    initCommentClick();
    initReceiveCoupon()();
    getCancelRuleNew();
    $(document).scroll();

    var href = window.location.href;
    var hrefLen = href.length;
    var commentFlag = href.indexOf('#comment') === hrefLen - 8 ? true : false;
    if (commentFlag) {
        $('#scorllFather').children('li').eq(4).trigger('click');
    }

    $(document).click(function(ev) {
        ev = ev || window.event || arguments.callee.caller.arguments[0];
        var target = ev.target || ev.srcElement;
        if (!/^(sameRoomNum)|(startenddate)$/.test(target.id) && !$(target).is(".select_box .select_arrow")){
            $('#detailRoomNumSelect').hide();
        }
        if (!/^(startenddate)|(calendar_btn_s)|(calendar-box)|(preMonth)|(nextMonth)|(clearSelect)|(detailCalendarIco)$/.test(target.id) && !$(target).is("#calendar-box,#calendar-box *") && !$(target).is(".price_bottom,.price_bottom *")){
            if( $('#startdate').val() !='' && $("#enddate").val() == '') {
                if(!$(target).is(".col_base ,.col_base *,.col_gray,.col_gray *")) {
                    $("#startenddate").fadeOut(200).fadeIn(200);
                }
            }
            else {
                if( $('#startdate').val() =='' && $("#enddate").val() == '') {
                    $('#startenddate').val('入住日期 - 离开日期');
                    if($("#calendar-box:visible").length){
                        deleteCookie('startDate','/','.'+topLevelDomain);
                        deleteCookie('endDate','/','.'+topLevelDomain);
                        clearDetialCalendar();
                    }
                    var rule_a = $('#rule_A').val() || 0;
                    if(rule_a){
                        $('.pos_2').text('如取消订单，扣除前'+rule_a+'天的订金');
                    }
                    var rule_n = $('#rule_N').val() || 0;
                    if(rule_n){
                        $('#pos_n_1').text('预订成功');
                        $('#pos_n_2').text('入住前'+rule_n+'天14:00前');
                        $('#pos_n_3').text('入住当天14:00前');
                        $('#pos_n_4').text('退房当天12:00前');
                    }
                    getCancelRuleNew();
                }
                $("#calendar-box").hide();
                $('#imgMouseCusor').bind('mousemove',DetailImageBox.cursorMouseMove);
            }
        }
    });

    $('#detailBookArea').on('change','#sameRoomNum',function(){
        calTotalPrice();
    });

    var luid = $("#lodgeUnitId").val();
    if(luid){
        XZWebAjax.get(XZWebUrlWriter.getAjax_GetSameRooms(luid),{},true,function(data){
            $("#otherRoomPart").html(data);
        },'html');
    }

    $('#webim-chat-user').click(function(e){
        e.preventDefault();
        if($('#loginUserId').length == 0){
            sessionStorage.setItem("from",'IMtalk');
        }
    });

    $('.contact-customer-service').click(function(e){
        if($('#loginUserId').length != 0){
            e.preventDefault();
            xzweb.ui.alert('请拔打 400-010-7890 联系客服');
        }
    });

    $('#alipay-trust-box').unbind('mouseover mouseout');
    // $('.zm_credit,#alipay-trust-box').hover(
    //     function(e){
    //             $('#alipay-trust-box').show().attr('show',1);
    //     },
    //     function(){
    //         var alipayTrustBox = $('#alipay-trust-box');
    //         alipayTrustBox.attr('show',0);
    //         setTimeout(function(){
    //             if(alipayTrustBox.attr('show') != 1){
    //                 alipayTrustBox.hide();
    //             }
    //         },300);
    //     }
    // );
    // $('.zm_credit').mouseenter(function(e){
    //     var tipHeight = $('#alipay-trust-box').height();
    //     if($(window).height() - e.screenY <  tipHeight-20){
    //         $('#alipay-trust-box').css('margin-top',-tipHeight-24);
    //     } else {
    //         $('#alipay-trust-box').css('margin-top',0);
    //     }
    // });

    $('#load_Ajax_GetDetalCommentAndOtherComment').on('click','.detail_comment_thumbimg',function(e){
        e.preventDefault();
        var dpConDiv = $(this).closest('.dp_con');
        $('#lightBoxDialog .small_pic_box').html(dpConDiv.find('.thumb-photo-nav').clone().show());
        DetailLightBox.init(dpConDiv.find('.pic_show li').index($(this).closest('li')));
        DetailLightBox.changePhoto();
        DetailLightBox.showLightBox();
    });

    $('#otherRoomPart').on('click','#next_btn',function(){
        if($('#otherRoomPart').attr('disabled')){
            return;
        }else{
            $('#otherRoomPart').attr('disabled',true)
        }
        var scroll_picWidth = $('.scroll_pic').width();
        var lastMarginLeft = $('#otherRoomUl').css('margin-left').replace(/px/,'');
        var newMarginLeft = lastMarginLeft-scroll_picWidth;
        var otherRoomUl = $('#otherRoomUl');
        var oriUlLength = otherRoomUl.attr('oriullength');
        if(!oriUlLength){
            oriUlLength = otherRoomUl.find('li').length;
            otherRoomUl.attr('oriullength',oriUlLength);
        }
        if(otherRoomUl.find('li').length*310+newMarginLeft-scroll_picWidth < scroll_picWidth){
            otherRoomUl.find('li').clone().appendTo(otherRoomUl);
        }
        otherRoomUl.animate({'margin-left': newMarginLeft+'px'},500,function(){
            $('#otherRoomPart').attr('disabled',false);
            if(newMarginLeft<=-oriUlLength*310*2){
                otherRoomUl.find('li:lt('+oriUlLength+')').remove();
                otherRoomUl.css('margin-left',newMarginLeft+oriUlLength*310+'px');
            }
        });
    }).on('click','#prev_btn',function(){
        if($('#otherRoomPart').attr('disabled')){
            return;
        }else{
            $('#otherRoomPart').attr('disabled',true)
        }
        var scroll_picWidth = $('.scroll_pic').width();
        var lastMarginLeft = $('#otherRoomUl').css('margin-left').replace(/px/,'');
        var newMarginLeft = lastMarginLeft-0+scroll_picWidth;
        var otherRoomUl = $('#otherRoomUl');
        var oriUlLength = otherRoomUl.attr('oriullength');
        if(!oriUlLength){
            oriUlLength = otherRoomUl.find('li').length;
            otherRoomUl.attr('oriullength',oriUlLength);
        }
        if(newMarginLeft >= 0){
            otherRoomUl.find('li:lt('+oriUlLength+')').clone().prependTo(otherRoomUl);
            otherRoomUl.css('margin-left',lastMarginLeft-oriUlLength*310+'px');
            newMarginLeft = lastMarginLeft-oriUlLength*310+scroll_picWidth;
        }
        otherRoomUl.animate({'margin-left': newMarginLeft+'px'},500,function(){
            $('#otherRoomPart').attr('disabled',false);
            var totalLength = otherRoomUl.find('li').length*310;
            if(newMarginLeft+totalLength-scroll_picWidth >= oriUlLength*310){
                otherRoomUl.find('li:gt('+(otherRoomUl.find('li').length-1-oriUlLength)+')').remove();
            }
        });
    });

});
if($('#greatFd').length && $(window).height() <= 640){
    $('.w_240').width('142');
}else{
    $('.w_240').width('215');
}

//房源全景iframe 关闭，全屏
$(function(){
    var stack = false;
    function close3dFrame(){
        $('#lodgeUnit3dMask').width(0).height(0);
        $(document.body).css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
        $('#lodgeUnit3d').width(978).height(550);
        $('#toggleFullScreen').attr('class','panorama_full');
        stack = false;
    }

    function show3dFrame(){
        $('#lodgeUnit3dMask').width('100%').height('100%');
        $(document.body).css({
            "overflow-x":"hidden",
            "overflow-y":"hidden"
        });
    }

    var toggleFullScreen = (function () {
        return function () {
            var lodge3dFrame = document.getElementById('lodgeUnit3d');
            if(stack){
                document.getElementById('close3dFrame').style.display = 'block';
                $('#toggleFullScreen').attr('class','panorama_full');
                $(document.body).css({
                    "overflow-x":"hidden",
                    "overflow-y":"hidden"
                });
                stack = false;
                lodge3dFrame.style.width = '978px';
                lodge3dFrame.style.height = '550px';
            }else{
                // document.getElementById('close3dFrame').style.display = 'none';
                $('#toggleFullScreen').attr('class','panorama_full exit');
                $(document.body).css({
                    "overflow-x":"auto",
                    "overflow-y":"auto"
                });
                stack = true;
                lodge3dFrame.style.width = 'auto';
                lodge3dFrame.style.height = 'auto';
            }
        }
    })();

    $(document).keydown(function(event){
        switch(event.keyCode){
            case  27:
                if($('#lodgeUnit3d').width() != '978'){
                    toggleFullScreen();
                }
                break;
        }
    });

    $('#show3dFrame').click(function(){
        show3dFrame();
    });
    $('#close3dFrame').click(function(){
        close3dFrame();
    });
    $('#toggleFullScreen').click(function(){
        toggleFullScreen();
    });

    $(document).on('click','.ui-widget-overlay',function(){
        $('#addFavoriteCancel').trigger('click');
    });
});

 
 var LodgeUnitCalendarImageCodeValidator = {
    needImageCodeValidate : true,
    getCalendarCode : function()
    {
        //{{{
        if(!this.needImageCodeValidate){
            return true;
        }
        var luId = $('#lodgeUnitId').val();
        var url = location.search;
        var requestParams = new Object();
        if(url.indexOf("?") != -1){
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i++){
                requestParams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        if(requestParams['calendarCode'] != null){
            sessionStorage.setItem('calendarCode_'+luId,requestParams['calendarCode']);
        }
        var calendarCode = sessionStorage.getItem('calendarCode_'+luId);
        if(!calendarCode || calendarCode == 'undefined'){
            return false;
        }
        return calendarCode;
        //}}}
    },
    removeCalendarCode : function()
    {
        //{{{
        var luId = $('#lodgeUnitId').val();
        sessionStorage.removeItem('calendarCode_'+luId);
        //window.location.reload();
        //}}}
    },
    showImageCodeBox : function()
    {
        //{{{
        var noCache = new Date().getTime();
        var imageCodeBox = [
            '<div id="imageCodeBox">',
                '<div style="position:fixed; left:0; top:0; z-index:6667; width:100%; height:130%; opacity:0.9; filter:alpha(opacity=90); background-color:#415161;"></div>',
                '<div style="width:400px; height:218px; border-radius:3px; background:#fff; position:fixed; z-index:6668; left:50%; top:50%; margin-top:-109px; margin-left:-200px; font:normal 16px/30px Microsoft YaHei;">',
                    '<h4  style=" height:50px; line-height:70px;font-size: 20px;text-align: center;  color:#2c3e50; font-weight: 400">请输入验证码</h4>',
                    '<div style="padding:35px 0 0 53px;">',
                        '<input class="validate_input" style="width:188px; height:38px; border:1px solid #ddd; padding-left:10px; font:normal 16px/38px Microsoft YaHei; color:#2c3e50;">',
                        '<span style="display:inline-block; width:70px; height:38px; border:1px solid #ddd; margin-left:5px;vertical-align:top;"><img style="width:68px;height:36px;" src="/ajaxRequest/AJAX_PicCheckCodeShow?nocache='+noCache+'" alt=""></span>',
                    '<div style="overflow:hidden;padding-top:30px">',
                        '<a class="validate_button" style="float: left;display: block;width: 130px;height: 40px;line-height: 40px;text-align: center;background: #f05b72;color: #fff;font-size: 18px;text-decoration: none;">提交</a> ',
                        '<a class="validate_closed" style="margin-left:20px;float: left;display: block;width: 130px;height: 40px;line-height: 40px;text-align: center;background: #FCDAE2;color: #f05b72;font-size: 18px;text-decoration: none;">取消</a>',
                    '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        this.validBox = $(imageCodeBox).appendTo($('body'));
        $('body').css('overflow','hidden');
        this.validBox.find('.validate_closed').click(function(){
            LodgeUnitCalendarImageCodeValidator.validBox.hide();
            $('body').css('overflow','visible');
            $('#imageCodeBox').remove();
        });

        this.validBox.find('.validate_input').keyup(LodgeUnitCalendarImageCodeValidator.checkCodeHanlder);

        this.validBox.find('.validate_button').click(LodgeUnitCalendarImageCodeValidator.checkCodeHanlder);

        this.validBox.find('.validate_input').focus(function(e){
            $(this).css('border','1px solid #2c3e50');
        });
        this.validBox.find('img').click(function(){
            $(this).attr('src',XZWebUrlWriter.getAjax_GetVerifyCode());
        }).hover(
            function(){
                $(this).css('cursor','pointer');
            },
            function(){
                $(this).css('cursor','default');
            }
            );;
        //}}}
    } ,
    checkCodeHanlder : function(e){
        var verifyCode = $('.validate_input').val();
        if(verifyCode.length>3){
            var luId = $('#lodgeUnitId').val();
            var data =  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjax_CheckCalendarVerifyCodeUrl(luId,verifyCode),'text');
            if(data){
                sessionStorage.setItem('calendarCode_'+luId,data);
                LodgeUnitCalendarImageCodeValidator.validBox.hide();
                window.location.reload();
                //$('#startenddate').click();
            } else {
                $('.validate_input').val('')
                LodgeUnitCalendarImageCodeValidator.validBox.find('img').click();
            }
        }
    }
}
 
 
$(function () {

    var oLA = $(".city_list_left>li>a");//左边的城市集合
    var oRA = $(".city_list_right>li>a");//右边的字母集合
    var oLS = $(".city_list_left>li>span");//左边的字母集合

    /*  点击事件：选择城市  */
    oLA.each(function (index, ele) {
        var cName = $(this).attr("data-en")[0].toUpperCase();
        var eq = index;
        $(this).click(function () {
            // hot change , eq = hot city number - 1
            if (eq <= 7) {
                $("#hot").css("background-position", "0 0");
            } else if (eq > 7) {
                $("#hot").css("background-position", "0 -15px");
            }

            for (var i = 0; i < oLA.length; i++) {
                oLA[i].className = "";
            }
            oRA.each(function () {
                $(this).removeClass();
            });
            $(this).addClass("active");

            /*   选择关闭  */
            $(".city_wrap i").html($(this).find("span").html());
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "region_spread");
            stack = !stack;

            $('#' + cName + '').attr("class", "active");
            var enName = $(this).attr('data-en');
            var flagName = (enName == 'HongKong' || enName == 'Macau' || enName == 'TaiWan') ? 'China' : enName.replace(/\s+/g, "_");
            if (enName == 'Ascension' || enName == 'French Guiana' || enName == 'Reunion') {
                $("#invite_country_box img").remove();
            } else {
                if (!$("#invite_country_box i").prev().is("img")) {
                    $("#invite_country_box i").before("<img>");
                }
                $("#invite_country_box img").attr('src', '/images/flag/' + flagName + ".jpg");
            }
            $('#invite_country').attr('countrycode', $(this).attr('data-code')).attr('countryname', $(this).attr('data-shortname')).attr('countryflag', flagName).text('+' + $(this).attr('data-code'));
        })
    });
    /*  点击事件：选择字母  */
    oRA.each(function (index, ele) {
        var oId = this.id;  //当前ID
        var eq = index;
        $(this).click(function () {
            if (eq == 0) {
                $("#hot").css("background-position", "0 0");
                $('.city_list').scrollTop(0);
                oRA.each(function () {
                    $(this).removeClass();
                })
            } else if (eq != 0) {
                $("#hot").css("background-position", "0 -15px");
                for (var i = 0; i < oLA.length; i++) {
                    var LName = oLA[i].getAttribute("data-en")[0].toUpperCase();
                    if (LName == oId) {
                        var sNum = oLA[i].offsetTop - 143;
                        $('.city_list').scrollTop(sNum);
                        return;
                    }
                }
            }
        });
    });
    /*  滚动事件：城市选框  */
    $(".city_list").scroll(function () {
        var top = this.scrollTop + 10 + "px";
        $(".city_list_right").css("top", top);
        if (this.scrollTop > 150) {
            $("#hot").css("background-position", "0 -15px");
            for (var i = 0; i < oLS.length; i++) {
                var Otop = oLS[i].offsetTop - this.scrollTop;
                var tName = oLS[i].innerHTML;

                if (Otop <= 150) {
                    oRA.each(function () {
                        $(this).removeClass();
                    });

                    $('#' + tName + '').attr("class", "active");
                }
            }
        } else {
            $("#hot").css("background-position", "0 0");
            oRA.each(function () {
                $(this).removeClass();
            });
        }

    });
    /*点击事件：展开&收缩*/
    var stack = false;
    $("#invite_country_box").click(function () {
        if (stack) {
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "city_list_spread");
            stack = !stack;
        } else {
            $(".city_list").show();
            $("#invite_city_list").attr("class", "city_list_shrink");
            stack = !stack;
        }
    });
    $('#goregister').on('click', function () {
        var url = [];
        var defaultNationCode = '86';
        var phone = $('#invitePhone').val();
        var directUrl = $('#inviteRegisterUrl').val()
        if (phone) {
            url.push('regphone=' + phone);
            if (defaultNationCode != $('#invite_country').attr('countrycode')) {
                url.push('countryname=' + $('#invite_country').attr('countryname'));
                url.push('countrycode=' + $('#invite_country').attr('countrycode'));
                url.push('countryflag=' + $('#invite_country').attr('countryflag'));
            }
            directUrl = directUrl + '&' + url.join('&');
        }
        window.location = directUrl;
    });
    $('#closeShareInvite').on('click',function(){
        $('#shareInvitePop').hide();
    });

});


 
 function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
};
function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
};
function regAct(){
    if(getUrlParms('utm_content')=='sem') {
        if (getCookie('xzuinfo')) {
            var downloadhtml = '<div class="download_wrap" style="position:fixed;bottom:0;width:100%;height:170px;text-allign:center;z-index:120;cursor:pointer">'
                + '<img src="close.png"/*tpa=http://jci.xiaozhustatic1.com/images/close.png*/  class="reg_close" style="position:absolute;left:50%;margin-left:420px;top:5%;z-index:140;cursor:pointer"/>'
                + '<img src="downloadbanner.png"/*tpa=http://jci.xiaozhustatic1.com/images/downloadbanner.png*/  class="download_main" style="height:170px;position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1920px;z-index:130;cursor:pointer"/>'
                + '</div>'
                + '<img src="downloadopen.png"/*tpa=http://jci.xiaozhustatic1.com/images/downloadopen.png*/  class="download_open" style="height:170px;position:fixed;bottom:0;left:-54px;z-index:150;cursor:pointer"/>';
            $('body').append(downloadhtml);
            $('.reg_close').on('click', function () {
                $('.download_wrap').animate({right: '1920px'}, 500);
                setTimeout(function () {
                    $('.download_open').animate({left: '0px'}, 200)
                }, 400)
            });
            $('.download_main').on('click', function () {
                window.location = 'https://s.growingio.com/XbLjzr';
            });
            $('.download_open').on('click', function () {
                $('.download_open').animate({left: '-54px'}, 200);
                $('.download_wrap').animate({right: '0px'}, 500);
            });
        } else {
            var reghtml = '<div class="reg_wrap" style="position:fixed;bottom:0;width:100%;height:170px;text-allign:center;z-index:120;cursor:pointer">'
                + '<img src="close.png"/*tpa=http://jci.xiaozhustatic1.com/images/close.png*/  class="reg_close" style="position:absolute;left:50%;margin-left:420px;top:5%;z-index:140;cursor:pointer"/>'
                + '<img src="regbanner.png"/*tpa=http://jci.xiaozhustatic1.com/images/regbanner.png*/  class="reg_main" style="height:170px;position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1920px;z-index:130;cursor:pointer"/>'
                + '</div>'
                + '<img src="open.png"/*tpa=http://jci.xiaozhustatic1.com/images/open.png*/  class="reg_open" style="height:170px;position:fixed;bottom:0;left:-54px;z-index:150;cursor:pointer"/>';
            $('body').append(reghtml);
            $('.reg_close').on('click', function () {
                $('.reg_wrap').animate({right: '1920px'}, 500);
                setTimeout(function () {
                    $('.reg_open').animate({left: '0px'}, 200)
                }, 400)
            });
            $('.reg_main').on('click', function () {
                $('.show-register-box')[0].click();
                $('.reg_wrap').animate({right: '1920px'}, 500);
                $('.reg_open').animate({left: '0px'}, 200);
            });
            $('.reg_open').on('click', function () {
                $('.reg_open').animate({left: '-54px'}, 200);
                $('.reg_wrap').animate({right: '0px'}, 500);
            });
        }
    }
};
regAct();
