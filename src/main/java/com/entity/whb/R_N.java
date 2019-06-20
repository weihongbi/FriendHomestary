package com.entity.whb;

public class R_N {
	private Integer rnid;
	private Integer rid;
	private Integer nid;
	public R_N() {
		super();
		// TODO Auto-generated constructor stub
	}
	public R_N(Integer rnid, Integer rid, Integer nid) {
		super();
		this.rnid = rnid;
		this.rid = rid;
		this.nid = nid;
	}
	public Integer getRnid() {
		return rnid;
	}
	public void setRnid(Integer rnid) {
		this.rnid = rnid;
	}
	public Integer getRid() {
		return rid;
	}
	public void setRid(Integer rid) {
		this.rid = rid;
	}
	public Integer getNid() {
		return nid;
	}
	public void setNid(Integer nid) {
		this.nid = nid;
	}
	@Override
	public String toString() {
		return "R_N [rnid=" + rnid + ", rid=" + rid + ", nid=" + nid + "]";
	}
	
	
}
