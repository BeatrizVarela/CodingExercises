<?php

namespace Drupal\Tests\rsvplist\Functional;

use Drupal\node\Entity\Node;
use Drupal\Tests\BrowserTestBase;

/**
 * Our RSVP test.
 */
class RSVPTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'node',
    'user',
    'rsvplist',
    'system',
    'block',
  ];

  /**
   * Setting up the Functional test for the RSVP block.
   */
  protected function setUp(): void {
    parent::setUp();

    // Create a user who will be used in this test with the view rsvplist permission.
    $this->user1 = $this->drupalCreateUser(['view rsvplist']);
    $this->drupalCreateContentType([
      'type' => 'article',
      'name' => 'Article',
    ]);

    // Create an admin user with all permissions.
    $this->adminUser = $this->drupalCreateUser([
      'administer site configuration',
      'administer blocks',
      'create article content',
      'view rsvplist',
      'administer rsvplist',
    ]);
  }

  /**
   * Test access to the RSVP reports.
   */
  public function testProfileAccess() {
    $this->drupalGet('admin/reports/rsvplist');
    $this->assertSession()->statusCodeEquals(403);
    $this->drupalLogin($this->user1);
    $this->assertSession()->statusCodeEquals(200);
  }

  /**
   * Test all the functionalities of the RSVP reports.
   */
  public function testAllFunctionalities() {
    $this->drupalLogin($this->adminUser);

    $this->drupalGet('admin/config/content/rsvplist');
    $this->assertSession()->statusCodeEquals(200);
    $this->submitForm(['rsvplist_types[article]' => TRUE], 'Save configuration');
    $this->assertSession()->pageTextContains('The configuration options have been saved');

    $this->drupalPlaceBlock('rsvp_block', [
      'id' => 'rsvpblock',
      'label' => 'RSVP Block',
    ]);

    $this->drupalGet('admin/structure/block/manage/rsvpblock');
    $this->submitForm(['visibility[entity_bundle:node][bundles][article]' => TRUE], 'Save block');

    $this->drupalGet('node/add/article');
    $this->assertSession()->pageTextContains('RSVP COLLECTION');
    $this->submitForm([
      'title[0][value]' => 'test',
      'edit-rsvplist-enabled' => TRUE,
    ], 'Save');

    $this->drupalGet('node/1');
    $this->assertSession()->pageTextContains('RSVP Block');
    $this->assertSession()->pageTextContains('Email address');
    $this->assertSession()->pageTextContains("We'll send updates to the email address you provide.");
    $this->submitForm(['edit-email' => 'test@test.com'], 'RSVP');

    $this->drupalGet('/admin/reports/rsvplist');
    $this->assertSession()->pageTextContains('test@test.com');
  }

  /**
   * Final test of the RSVP reports.
   */
  public function testRsvp() {
    $node = Node::create([
      'type' => 'article',
      'title' => 'test',
    ]);
    $node->save();

    \Drupal::service('rsvplist.enabler')->setEnabled($node);
    // 'rsvplist_enabled' => TRUE,
    $this->drupalGet('node/' . $node->id());
  }

}
