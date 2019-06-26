package com.entity.whb;

public class Rols {
	private Integer rid;
	private String rname;	
	public Rols() {
		super();
	}
	public Rols(Integer rid, String rname) {
		super();
		this.rid = rid;
		this.rname = rname;
	}
	
	public Integer getRid() {
		return rid;
	}
	public void setRid(Integer rid) {
		this.rid = rid;
	}
	
	public String getRname() {
		return rname;
	}
	public void setRname(String rname) {
		this.rname = rname;
	}	
	@Override
	public String toString() {
		return "Rols [rid=" + rid + ", rname=" + rname + "]";
	}
	
}
