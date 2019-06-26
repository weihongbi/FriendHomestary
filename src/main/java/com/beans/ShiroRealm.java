package com.beans;


import com.entity.whb.Users;
import com.service.whb.UsersService;
import org.apache.shiro.authc.*;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import javax.annotation.Resource;

public class ShiroRealm extends AuthenticatingRealm {
    @Resource
    private UsersService service;
    private SimpleAuthenticationInfo info = null;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 将token装换成UsernamePasswordToken
        UsernamePasswordToken upToken = (UsernamePasswordToken) authenticationToken;
        // 获取用户名即可
        String username = upToken.getUsername();
        // 查询数据库，是否查询到用户名和密码的用户
        List<Users> userInfo =  service.find(username);
        if(userInfo != null) {
            // 如果查询到了，封装查询结果，返回给我们的调用
            Object principal =  userInfo.get(0).getUname();
            Object credentials = userInfo.get(0).getUpwd();
            // 获取盐值，即用户名
            ByteSource salt = ByteSource.Util.bytes(username);
            String realmName = this.getName();
            // 将账户名，密码，盐值，realmName实例化到SimpleAuthenticationInfo中交给Shiro来管理
            info = new SimpleAuthenticationInfo(principal, credentials,salt,realmName);
        }else {
            // 如果没有查询到，抛出一个异常
            throw new AuthenticationException();
        }
        return info;
    }
}
