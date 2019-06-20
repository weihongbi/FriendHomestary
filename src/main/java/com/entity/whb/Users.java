package com.entity.whb;

public class Users {
    private Integer uid;
    private Integer empid;
    private String uname;
    private String  upwd;
    private Integer rid;
    public Users() {
        super();
    }

    public Users(Integer uid, Integer empid, String uname, String upwd, Integer rid) {
        this.uid = uid;
        this.empid = empid;
        this.uname = uname;
        this.upwd = upwd;
        this.rid = rid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getEmpid() {
        return empid;
    }

    public void setEmpid(Integer empid) {
        this.empid = empid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUpwd() {
        return upwd;
    }

    public void setUpwd(String upwd) {
        this.upwd = upwd;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    @Override
    public String toString() {
        return "Users{" +
                "uid=" + uid +
                ", empid=" + empid +
                ", uname='" + uname + '\'' +
                ", upwd='" + upwd + '\'' +
                ", rid=" + rid +
                '}';
    }
}
