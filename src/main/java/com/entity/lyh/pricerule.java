package com.entity.lyh;

public class pricerule {
	private int pruleId;
	private int price;
	private String promotion;
	private int earnest;
	private int cleaningFee;
	private int allow;
	private String priceRule;
	public pricerule() {
		super();
		// TODO Auto-generated constructor stub
	}
	public pricerule(int pruleId, int price, String promotion, int earnest, int cleaningFee, int allow,
			String priceRule) {
		super();
		this.pruleId = pruleId;
		this.price = price;
		this.promotion = promotion;
		this.earnest = earnest;
		this.cleaningFee = cleaningFee;
		this.allow = allow;
		this.priceRule = priceRule;
	}
	public int getPruleId() {
		return pruleId;
	}
	public void setPruleId(int pruleId) {
		this.pruleId = pruleId;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getPromotion() {
		return promotion;
	}
	public void setPromotion(String promotion) {
		this.promotion = promotion;
	}
	public int getEarnest() {
		return earnest;
	}
	public void setEarnest(int earnest) {
		this.earnest = earnest;
	}
	public int getCleaningFee() {
		return cleaningFee;
	}
	public void setCleaningFee(int cleaningFee) {
		this.cleaningFee = cleaningFee;
	}
	public int getAllow() {
		return allow;
	}
	public void setAllow(int allow) {
		this.allow = allow;
	}
	public String getPriceRule() {
		return priceRule;
	}
	public void setPriceRule(String priceRule) {
		this.priceRule = priceRule;
	}
	@Override
	public String toString() {
		return "pricerule [pruleId=" + pruleId + ", price=" + price + ", promotion=" + promotion + ", earnest="
				+ earnest + ", cleaningFee=" + cleaningFee + ", allow=" + allow + ", priceRule=" + priceRule + "]";
	}

	
}
