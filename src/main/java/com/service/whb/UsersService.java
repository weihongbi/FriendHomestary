package com.service.whb;



import com.dao.whb.UseresDAO;
import com.entity.whb.Users;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UsersService {
    @Resource
    UseresDAO dao;
    public List<Users> find(String uname){
        return dao.find(uname);
    }
}
