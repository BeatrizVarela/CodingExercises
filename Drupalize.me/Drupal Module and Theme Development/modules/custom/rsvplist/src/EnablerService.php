<?php

namespace Drupal\rsvplist;

use Drupal\Core\Database\Database;
use Drupal\node\Entity\Node;

/**
 * Defines a service for managing RSVP list enabled for nodes.
 */
class EnablerService {

  /**
   * Constructor.
   */
  public function __construct() {

  }

  /**
   * Sets an individual node to be RSVP enabled.
   *
   * @param \Drupal\node\Entity\Node $node
   *   Enables RSVP.
   */
  public function setEnabled(Node $node) {
    if (!$this->isEnabled($node)) {
      $insert = Database::getConnection()->insert('rsvplist_enabled');
      $insert->fields(['nid'], [$node->id()]);
      $insert->execute();
    }
  }

  /**
   * Checks if an individual node is RSVP enabled.
   *
   * @param \Drupal\node\Entity\Node $node
   *   Checks if RSVP enabled.
   *
   * @return bool
   *   Whether the node is enabled for the RSVP functionality.
   */
  public function isEnabled(Node $node) {
    if ($node->isNew()) {
      return FALSE;
    }
    $select = Database::getConnection()->select('rsvplist_enabled', 're');
    $select->fields('re', ['nid']);
    $select->condition('nid', $node->id());
    $results = $select->execute();
    return !empty($results->fetchCol());
  }

  /**
   * Deletes enabled settings for an individual node.
   *
   * @param \Drupal\node\Entity\Node $node
   *   Deletes enabled settings.
   */
  public function delEnabled(Node $node) {
    $delete = Database::getConnection()->delete('rsvplist_enabled');
    $delete->condition('nid', $node->id());
    $delete->execute();
  }

}
