package com.backend.sec01.publisher;

import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;

public class PublisherImpl implements Publisher<String> {
  @Override
  public void subscribe(Subscriber<? super String> subscriber) {
    var subscription = new SubscriptionImpl();
    subscriber.onSubscribe(subscription);
  }
}
