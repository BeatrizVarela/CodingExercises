<?php

namespace Drupal\Tests\rsvplist\Kernel;

use Drupal\Core\Database\Database;
use Drupal\KernelTests\KernelTestBase;
use Drupal\rsvplist\EnablerService;
use Drupal\node\Entity\Node;

/**
 * Test the RSVP Enabler.
 */
class RSVPEnablerTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'rsvplist', // Load our own module, so we can access and test it.
    'node', // Load the node module, as we use it as a parameter on the tests.
    'user', // Load the user module, because we need one to verify the access.
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->installSchema('rsvplist', 'rsvplist_enabled', 'system');
    $this->installEntitySchema('user');
    $this->installEntitySchema('node');
  }

  /**
   * Tests the Enabler::setEnabled() and Enabler::delEnabled() method.
   */
  public function testSetDelEnabledTest() {
    $node1 = Node::create([
      'type' => 'article',
      'title' => 'Test',
    ]);
    $node1->save();
    $enabler = new EnablerService();

    $enabler->setEnabled($node1);
    $select = Database::getConnection()->select('rsvplist_enabled', 're');
    $select->fields('re', ['nid']);
    $select->condition('nid', $node1->id());
    $results = $select->execute()->fetchCol();
    $this->assertNotEmpty($results);

    $enabler->delEnabled($node1);
    $select = Database::getConnection()->select('rsvplist_enabled', 're');
    $select->fields('re', ['nid']);
    $select->condition('nid', $node1->id());
    $results = $select->execute()->fetchCol();
    $this->assertEmpty($results);
  }

}
